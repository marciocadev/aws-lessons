import os 

from aws_cdk.aws_certificatemanager import Certificate
from aws_cdk.core import Construct, RemovalPolicy
from aws_cdk.aws_s3 import Bucket
from aws_cdk.aws_s3_deployment import BucketDeployment, Source
from aws_cdk.aws_lambda import Function, Code, Runtime
from aws_cdk.aws_apigateway import LambdaRestApi, LambdaIntegration
from aws_cdk.aws_cloudfront import AllowedMethods, Behavior, CloudFrontAllowedMethods, CloudFrontWebDistribution, CustomOriginConfig, OriginProtocolPolicy, S3OriginConfig, SSLMethod, SecurityPolicyProtocol, SourceConfiguration, ViewerCertificate, ViewerProtocolPolicy

from custom_domain_example.domain_stack import DomainStack


class CustomDomainExampleStack(DomainStack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        gtw_lmb = Function(self, 'gtw-lmb', function_name='custom-domain-gtw-lmb',
            code=Code.from_asset('lambda_fns/gtw-lmb'),
            handler='lambda.handler',
            runtime=Runtime.PYTHON_3_9)
        gtw = LambdaRestApi(self, 'custom-domain-gtw', 
            handler=gtw_lmb, proxy=False)
        res_api_gtw = gtw.root.add_resource('api')
        api_get_gtw = res_api_gtw.add_resource('get')
        api_get_gtw.add_method('GET', integration=LambdaIntegration(gtw_lmb))
        url = self.map_apigateway_subdomain('gtw', gtw)
        print(url)


        gtw2_lmb = Function(self, 'gtw2-lmb', function_name='custom-domain-gtw2-lmb',
            code=Code.from_asset('lambda_fns/gtw2-lmb'),
            handler='lambda.handler',
            runtime=Runtime.PYTHON_3_9)
        gtw2 = LambdaRestApi(self, 'custom-domain-gtw2', 
            handler=gtw_lmb, proxy=False)
        res_api_gtw2 = gtw2.root.add_resource('api')
        res_get_gtw2 = res_api_gtw2.add_resource('get')
        res_get_gtw2.add_method('GET', integration=LambdaIntegration(gtw2_lmb))
        site_domain = 'marciocadev.com'
        site_bucket = Bucket(self, 'bucket', bucket_name=site_domain,
            website_index_document='index.html',
            website_error_document='error.html',
            removal_policy=RemovalPolicy.DESTROY,
            auto_delete_objects=True,
            public_read_access=True)
        BucketDeployment(self, 'bucket-deployment',
            sources=[Source.asset('website')],
            destination_bucket=site_bucket,
            destination_key_prefix='/'
        )
        ZONE_CERT = os.getenv("ZONE_CERT")
        website_domain = 'site.' + site_domain
        distribution = CloudFrontWebDistribution(self, 'web-dist',
            origin_configs=[
                SourceConfiguration(
                    s3_origin_source=S3OriginConfig(
                        s3_bucket_source=site_bucket
                    ),
                    behaviors=[Behavior(is_default_behavior=True)]
                ),
                SourceConfiguration(
                    custom_origin_source=CustomOriginConfig(
                        domain_name=gtw2.rest_api_id+'.execute-api.'+self.region+'.'+self.url_suffix,
                        origin_path='/'+gtw2.deployment_stage.stage_name, #+'/'+res_gtw2.path,
                        http_port=80, https_port=443,
                        origin_protocol_policy=OriginProtocolPolicy.HTTPS_ONLY
                    ),
                    behaviors=[
                        Behavior(
                            is_default_behavior=False, 
                            path_pattern='api/*',
                            allowed_methods=CloudFrontAllowedMethods.ALL
                        )
                    ]
                )
            ],
            viewer_certificate=ViewerCertificate.from_acm_certificate(
                certificate=Certificate.from_certificate_arn(self, 'cert', certificate_arn=ZONE_CERT),
                aliases=[website_domain],
                ssl_method=SSLMethod.SNI,
                security_policy=SecurityPolicyProtocol.TLS_V1_2_2019
            )
        )
        url = self.map_cloudfront_subdomain('site', distribution)
        print(url)