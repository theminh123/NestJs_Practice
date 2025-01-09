import { ArgumentsHost, Catch} from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { GraphQLError } from "graphql";

@Catch()
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    return new GraphQLError(exception.response.message || 'Internal Server Error', {
      extensions: {
        errorCode: exception.getResponse ? exception.getResponse()['error'] : 'Internal Server Error',
        devMessage: exception.response.message || 'Internal Server Error',
        data: GqlArgumentsHost.create(host).getArgs(),
      },
    });
  }
}

