import { BasicInterceptor } from 'growi-pluginkit';
import mlu from './MarkdownListUtil';

export default class MarkdownListInterceptor extends BasicInterceptor {

  constructor() {
    super();
  }

  /**
   * @inheritdoc
   */
  isInterceptWhen(contextName) {
    return (
      contextName === 'preHandleEnter'
    );
  }

  /**
   * return boolean value whether processable parallel
   */
  isProcessableParallel() {
    return false;
  }

  /**
   * @inheritdoc
   */
  process(contextName, ...args) {
    const context = Object.assign(args[0]);   // clone
    const editor = context.editor;            // AbstractEditor instance

    // get strings from current position to EOL(end of line) before break the line
    const strToEol = editor.getStrToEol();
    if (mlu.indentAndMarkRE.test(strToEol)) {
      editor.insertLinebreak(strToEol);

      // report to manager that handling was done
      context.handlers.push(this.className);
    }

    // resolve
    return Promise.resolve(context);
  }
}
