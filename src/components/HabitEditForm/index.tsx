import type { IHabit } from '@t/habit.types';
import Button, { ButtonVariant } from '@ui-kit/Button';
import InputWrapper from '@ui-kit/InputWrapper';
import clsx from 'clsx';
import type React from 'react';
import type { FormHTMLAttributes } from 'react';

import styles from './styles.module.css';

interface IHabitEditFormProps extends FormHTMLAttributes<HTMLFormElement> {
  habit?: IHabit;
  onSave: (habit: IHabit) => void;
  onCancel?: () => void;
  disabled?: boolean;
}
const HabitEditForm: React.FC<IHabitEditFormProps> = ({
  habit,
  onSave,
  onCancel,
  ...rest
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    ) as {
      name: string;
      shortName: string;
      color: string;
      description: string;
    };
    onSave({
      id: habit?.id ?? '',
      name: data.name,
      description: data.description,
      color: data.color,
      shortName: data.shortName,
      createdAt: habit?.createdAt ?? new Date().toISOString(),
      updatedAt: habit?.createdAt ? new Date().toISOString() : null,
      archivedAt: null,
      periodicityHour: null,
    } satisfies IHabit);
  };
  return (
    <form
      {...rest}
      onSubmit={handleSubmit}
      onReset={onCancel}
      className={clsx(styles.habitEditForm, rest.className)}
    >
      <InputWrapper label="Название">
        <input
          name="name"
          required
          placeholder="Чистить зубы"
          defaultValue={habit?.name}
        />
      </InputWrapper>
      <InputWrapper label="Описание">
        <textarea
          name="description"
          placeholder="Стоматолог посоветовал"
          defaultValue={habit?.description ?? ''}
        />
      </InputWrapper>

      <div className={styles.inpGroup}>
        <InputWrapper label="Короткое название или emoji">
          <input
            name="shortName"
            placeholder="ЧЗ"
            maxLength={3}
            required
            defaultValue={habit?.shortName}
          />
        </InputWrapper>
        <InputWrapper label="Цвет">
          <input
            name="color"
            required
            type="color"
            defaultValue={habit?.color ?? '#0ac2f0'}
          />
        </InputWrapper>
      </div>

      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 'auto',
          gap: 12,
        }}
      >
        <Button
          type="reset"
          variant={ButtonVariant.secondary}
          style={{ width: '50%' }}
        >
          Отмена
        </Button>
        <Button
          type="submit"
          variant={ButtonVariant.primary}
          style={{ width: '50%' }}
        >
          {habit?.id ? 'Сохранить' : 'Добавить'}
        </Button>
      </footer>
    </form>
  );
};

export default HabitEditForm;
