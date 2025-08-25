export interface MyComponentProps {
  content: string;
}

export const MyComponent = (props: MyComponentProps) => props.content;

MyComponent.displayName = 'MyComponent';
