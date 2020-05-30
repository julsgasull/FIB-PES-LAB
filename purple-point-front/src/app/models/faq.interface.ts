export interface FAQ {
  id:            number;
  question?:     string;
  answer?:       string;
  isUpvoted?:    boolean;
  isDownvoted?:  boolean;
  numUpvotes?:   number;
  numDownvotes?: number;
}