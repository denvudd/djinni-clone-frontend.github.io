'use client';

import React from 'react';

import { Input } from './Input';
import {
  defaultCountries,
  FlagEmoji,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select';

export interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
}

import 'react-international-phone/style.css';

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  ...restProps
}) => {
  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: 'ua',
      value,
      forceDialCode: true,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

  return (
    <div className="flex items-center">
      <Select onValueChange={setCountry} value={country}>
        <SelectTrigger className="w-[80px] h-10 rounded-se-none rounded-ee-none shadow-none">
          <SelectValue asChild>
            <div>{country.toUpperCase()}</div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-w-[300px] max-h-[150px]">
          {defaultCountries.map((c) => {
            const country = parseCountry(c);

            return (
              <SelectItem key={country.iso2} value={country.iso2}>
                <div className="inline-flex gap-2 items-center">
                  <FlagEmoji iso2={country.iso2} />
                  {country.name}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Input
        value={phone}
        onChange={handlePhoneValueChange}
        type="tel"
        ref={inputRef}
        className="border-l-0 rounded-ss-none rounded-es-none"
        {...restProps}
      />
    </div>
  );
};

export default PhoneInput;
