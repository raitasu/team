import React, { useState } from 'react';

import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VisuallyHidden
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IoIosClose } from 'react-icons/io';
import { MdSearch } from 'react-icons/md';

import { FormControl } from '~/shared/ui/components/FormControl';
import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';
import { setEmployeesFilters } from '~/store/slices/employees/employees.slice';
import { useAppDispatch } from '~/store/store.hooks';

export const SearchEmployee = () => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const [valueInput, setValueInput] = useState('');

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(evt.target.value);
  };

  const onKeyDownForm = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Enter' && valueInput) {
      dispatch(setEmployeesFilters({ employee_name: valueInput }));
    }
  };

  const onClickClear = () => {
    setValueInput('');
    dispatch(setEmployeesFilters({ employee_name: '' }));
  };

  return (
    <FormControl
      onKeyDown={onKeyDownForm}
      style={{ width: '310px' }}
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="brand.lightGray"
        >
          <MdSearch size="20px" />
        </InputLeftElement>
        <Input
          value={valueInput}
          onChange={onChangeInput}
          placeholder={t('domains:filters.placeholders.placeholder_name')}
        />
        {valueInput && (
          <InputRightElement>
            <ControlButton
              style={{
                top: '1px',
                paddingInlineStart: 0,
                paddingInlineEnd: 0
              }}
              aria-label={t('general_actions:reset')}
              icon={<IoIosClose />}
              onClick={onClickClear}
            >
              <VisuallyHidden>Clear</VisuallyHidden>
            </ControlButton>
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};
