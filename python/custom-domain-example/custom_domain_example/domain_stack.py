import os

from aws_cdk.core import Stack, Construct, Environment
from aws_cdk.aws_certificatemanager import Certificate
from aws_cdk.aws_route53 import HostedZone, ARecord, RecordTarget
from aws_cdk.aws_route53_targets import ApiGatewayDomain, CloudFrontTarget
from aws_cdk.aws_apigateway import RestApi
from aws_cdk.aws_cloudfront import CloudFrontWebDistribution


aws_env = Environment(account=os.getenv("CDK_DEFAULT_ACCOUNT"), 
                    region=os.getenv("CDK_DEFAULT_REGION"))
ZONE_NAME = os.getenv("ZONE_NAME")
ZONE_ID = os.getenv("ZONE_ID")
ZONE_CERT = os.getenv("ZONE_CERT")


class DomainStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, env=aws_env, **kwargs)

        self.cert = Certificate \
                .from_certificate_arn(self, 'domain-certificate', ZONE_CERT)
        self.hosted_zone = HostedZone \
                    .from_hosted_zone_attributes(self, 'hosted-zone',
                        hosted_zone_id=ZONE_ID, zone_name=ZONE_NAME)

    def map_apigateway_subdomain(self, subdomain: str, api: RestApi) -> str:
        domain_name = subdomain + "." + ZONE_NAME
        url = 'https://' + domain_name

        domain = api.add_domain_name('domain', certificate=self.cert, domain_name=domain_name)

        ARecord(self, self.stack_name + 'domain', record_name=subdomain, 
            zone=self.hosted_zone, target=RecordTarget.from_alias(ApiGatewayDomain(domain)))

        return url

    def map_cloudfront_subdomain(self, subdomain: str, cf: CloudFrontWebDistribution) -> str:
        domain_name = subdomain + "." + ZONE_NAME
        url = 'https://' + domain_name

        ARecord(self, self.stack_name + 'dist-domain', record_name=subdomain,
            zone=self.hosted_zone, target=RecordTarget.from_alias(CloudFrontTarget(cf)))

        return url