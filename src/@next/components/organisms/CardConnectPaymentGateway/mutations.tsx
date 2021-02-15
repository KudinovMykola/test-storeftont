import { DocumentNode } from "graphql";
import * as React from "react";
import { Mutation, MutationFn } from "react-apollo";

export interface TypedMutationInnerProps<TData, TVariables> {
  children: (
    mutateFn: MutationFn<TData, TVariables>,
  ) => React.ReactNode;
  variables?: TVariables;
}

export function TypedCCMutation<TData, TVariables>(
  mutation: DocumentNode,
) {
  return (props: TypedMutationInnerProps<TData, TVariables>) => {
    const {
      children,
      variables,
    } = props as JSX.LibraryManagedAttributes<
      typeof TypedCCMutation,
      typeof props
      >;
    return (
      <Mutation
        mutation={mutation}
        variables={variables}
      >
        {children}
      </Mutation>
    );
  };
}
