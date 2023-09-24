export type ElementStatesType =
  | ElementStates.Default
  | ElementStates.Changing
  | ElementStates.Modified;

export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export type LinkedListStateType =
  | LinkedListStates.AddToHead
  | LinkedListStates.AddToTail
  | LinkedListStates.AddByIndex
  | LinkedListStates.DeleteFromHead
  | LinkedListStates.DeleteFromTail
  | LinkedListStates.DeleteByIndex
  | LinkedListStates.Empty
  | LinkedListStates.Success;

export enum LinkedListStates {
  AddToHead = "addToHead",
  AddToTail = "addToTail",
  AddByIndex = "addByIndex",
  DeleteFromHead = "deleteFromHead",
  DeleteFromTail = "deleteFromTail",
  DeleteByIndex = "deleteFromIndex",
  Empty = "null",
  Success = "success",
}
