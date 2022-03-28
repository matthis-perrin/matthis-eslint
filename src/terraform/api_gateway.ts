export function generateApiGateway(projectName: string): string {
  return `
  resource "aws_api_gateway_rest_api" "api" {
    name        = "${projectName}-RestAPI"
    description = "Rest API for the \\"${projectName}\\" app"
  }
  
  resource "aws_api_gateway_resource" "api" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    parent_id   = aws_api_gateway_rest_api.api.root_resource_id
    path_part   = "{proxy+}"
  }
   
  resource "aws_api_gateway_method" "api" {
    rest_api_id   = aws_api_gateway_rest_api.api.id
    resource_id   = aws_api_gateway_resource.api.id
    http_method   = "ANY"
    authorization = "NONE"
  }
  
  resource "aws_api_gateway_method" "api_root" {
     rest_api_id   = aws_api_gateway_rest_api.api.id
     resource_id   = aws_api_gateway_rest_api.api.root_resource_id
     http_method   = "ANY"
     authorization = "NONE"
  }
  
  resource "aws_api_gateway_integration" "api" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_method.api.resource_id
    http_method = aws_api_gateway_method.api.http_method
   
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = aws_lambda_function.api.invoke_arn
  }
  
  resource "aws_api_gateway_integration" "api_root" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_method.api_root.resource_id
    http_method = aws_api_gateway_method.api_root.http_method
  
    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = aws_lambda_function.api.invoke_arn
  }
  
  resource "aws_api_gateway_deployment" "api" {
    depends_on = [
      aws_api_gateway_integration.api,
      aws_api_gateway_integration.api_root,
    ]
    rest_api_id = aws_api_gateway_rest_api.api.id
    stage_name  = "prod"
  
    triggers = {
      redeployment = sha1(jsonencode(aws_api_gateway_integration.api))
    }
  
    lifecycle {
      create_before_destroy = true
    }
  }
  
  resource "aws_lambda_permission" "api" {
    statement_id  = "AllowAPIGatewayInvoke"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.api.function_name
    principal     = "apigateway.amazonaws.com"
    source_arn    = "\${aws_api_gateway_rest_api.api.execution_arn}/*/*"
  }      
`.trim();
}