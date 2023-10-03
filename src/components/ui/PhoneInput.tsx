'use client';

import React from 'react';

import {
  defaultCountries,
  FlagEmoji,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import { Input } from './Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';

import 'react-international-phone/style.css';

export interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, ...restProps }) => {
  const { phone, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
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
        <SelectTrigger className="h-10 w-[80px] rounded-ee-none rounded-se-none shadow-none">
          <SelectValue asChild>
            <div>{country.toUpperCase()}</div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[150px] max-w-[300px]">
          {defaultCountries.map((c) => {
            const country = parseCountry(c);

            return (
              <SelectItem key={country.iso2} value={country.iso2}>
                <div className="inline-flex items-center gap-2">
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
        className="rounded-es-none rounded-ss-none border-l-0"
        {...restProps}
      />
    </div>
  );
};

export default PhoneInput;
