import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import * as React from 'react';
import './QuantityInput.scss';

interface QuantityInputProps {
  value?: number;

  onChange: (value: number) => void;
}

function QuantityInput(props: QuantityInputProps) {
  const {onChange, value} = props;

  const handleChange = React.useCallback(
    (event) => {
      const value: number = parseInt(event, 10) || 0;
      if (onChange) {
        onChange(value);
      }
    },
    [onChange],
  );

  const handleKeyDown = React.useCallback((event) => {
    if (event.key.length === 1) {
      if (event.key < '0' || event.key > '9') {
        event.preventDefault();
      }
    }
  }, []);

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(event.target.value);
    },
    [handleChange],
  );

  const handleIncrease = React.useCallback(
    () => {
      if (typeof value !== 'undefined') {
        handleChange(value + 1);
      }
    },
    [handleChange, value],
  );

  const handleDecrease = React.useCallback(
    () => {
      if (typeof value !== 'undefined' && value > 0) {
        handleChange(value - 1);
      }
    },
    [handleChange, value],
  );

  return (
    <div className="quantity-input">
      <Button className="minus" onClick={handleDecrease}>
        <Icon type="minus"/>
      </Button>
      <Input value={value} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
      <Button className="plus" onClick={handleIncrease}>
        <Icon type="plus"/>
      </Button>
    </div>
  );
}

export default QuantityInput;
