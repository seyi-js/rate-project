import { Logger } from "@nestjs/common";
import { IDebug, IVerbose } from "./abstract.interface";


export class ModuleAbstractService {
    logger: Logger = new Logger(ModuleAbstractService.name)

    verbose(payload:IVerbose){
     return   this.logger.verbose({...payload,class:payload.class.name})
    }

    debug(payload:IDebug){
        return this.logger.debug({...payload,class:payload.class.name})
    }
}