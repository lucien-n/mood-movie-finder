import cors from "./cors";
import { errorLogger, infoLogger } from "./logger";
import swagger from "./swagger";

export default { before: [infoLogger, cors, swagger], after: [errorLogger] };
