import { Application } from '../declarations';
import cycleTemplate from './cycles/cycles.service';
import cycles from './iterations/iterations.service';
import fieldsTemplates from './fields-templates/fields-templates.service';
import fields from './fields/fields.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(cycleTemplate);
  app.configure(cycles);
  app.configure(fieldsTemplates);
  app.configure(fields);
}
