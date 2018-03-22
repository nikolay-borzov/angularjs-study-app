/**
 * Makes type expandable with custom properties
 * Usage: let a: SomeType & IExpandable
 */
export interface IExpandable {
  [name: string]: any;
}
