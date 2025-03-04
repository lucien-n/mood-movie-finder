import { Controller } from "./controller";
import { Service } from "./service";

export class Module {
  public provides: (typeof Controller)[] = [];
  public imports: (typeof Service)[] = [];
  public exports: (typeof Service)[] = [];
}
