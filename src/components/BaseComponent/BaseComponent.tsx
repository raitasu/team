import { BaseComponentTitle } from 'components/BaseComponent/baseComponent.styled';
import { BaseComponentProps } from 'components/BaseComponent/baseComponent.types';

export function BaseComponent({ title }: BaseComponentProps) {
  return <BaseComponentTitle>{title}</BaseComponentTitle>;
}
