'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { useMutation, useQueries } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { DollarSign, Trash2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import axios from '@/lib/axios';
import { getCategories } from '@/actions/get-categories';
import { getCities } from '@/actions/get-cities';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Slider } from '@/components/ui/Slider';
import ErrorAlert from '@/components/ui/ErrorAlert';
import EnglishLevelGroup from '@/components/EnglishLevelGroup';
import EditCandidateSkills from '@/components/EditCandidateSkills';

import {
  CandidateProfileRequest,
  CandidateProfileValidator,
} from '@/lib/validators/candidate-account/candidate-profile';
import {
  CommunicateMethod,
  CompanyType,
  EmploymentOption,
  EnglishLevel,
  PreferableLanguage,
} from '@/lib/enums';
import {
  type BlockedDomain,
  type BlockedVacancyType,
  type CandidateProfile as CandidateProfileType,
  type Domain,
  type Skill,
} from '@/types';
import { convertEnumObjToArray, formatEmploymenOptions, formatExperience } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

interface CandidateProfileProps {
  candidateId: string;
  position: string;
  category: string;
  skills: Skill[];
  experience: number;
  expectations: number;
  city: string;
  english: EnglishLevel;
  experienceDescr: string | undefined;
  achievementsDescr: string | undefined;
  expectationsDescr: string | undefined;
  employmentOptions: EmploymentOption;
  hourlyRate: number | undefined;
  blockedDomains: BlockedDomain[] | undefined;
  blockedTypes: BlockedVacancyType[] | undefined;
  preferableLang: PreferableLanguage;
  communicateMethod: CommunicateMethod;
  employerQuestions: string | undefined;
  isRelocate: boolean;
}

const CandidateProfile: React.FC<CandidateProfileProps> = (props) => {
  const {
    candidateId,
    achievementsDescr,
    blockedDomains,
    blockedTypes,
    category,
    city,
    communicateMethod,
    employmentOptions,
    english,
    expectations,
    expectationsDescr,
    experience,
    experienceDescr,
    hourlyRate,
    position,
    preferableLang,
    skills,
    employerQuestions,
    isRelocate,
  } = props;

  const [selectedDomains, setSelectedDomains] = React.useState<string[]>(
    blockedDomains?.map((skill) => skill.name) ?? [],
  );
  const [selectedVacanciesTypes, setSelectedVacanciesTypes] = React.useState<string[]>(
    blockedTypes?.map((skill) => skill.name) ?? [],
  );
  const router = useRouter();

  const form = useForm<CandidateProfileRequest>({
    resolver: zodResolver(CandidateProfileValidator),
    defaultValues: {
      ...props,
      blockedDomains: selectedDomains,
      blockedTypes: selectedVacanciesTypes,
    },
  });

  const {
    mutate: updateProfile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useMutation({
    mutationFn: async (values: CandidateProfileRequest) => {
      const payload: CandidateProfileRequest = {
        ...values,
      };

      const { data } = await axios.patch(`/candidate/${candidateId}`, payload);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as CandidateProfileType;
    },
    onSuccess: () => {
      router.push('/my/profile?updated=ok');
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  const [
    { data: domains, isLoading: isDomainsLoading, isError: isDomainsError },
    { data: categories, isLoading: isCategoriesLoading },
    { data: cities, isLoading: isCitiesLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['domains'],
        queryFn: async () => {
          const { data } = await axios.get('/categories/domain-categories');

          if (data instanceof AxiosError) {
            throw new Error();
          }

          return data as Domain[];
        },
      },
      {
        queryKey: ['categories'],
        queryFn: async () => getCategories(),
      },
      {
        queryKey: ['cities'],
        queryFn: async () => getCities(),
      },
    ],
  });

  function onSubmit(values: CandidateProfileRequest) {
    updateProfile(values);
  }

  console.log(form.watch());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">
        {isProfileError && <ErrorAlert />}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-center">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                Посада
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Input className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-center">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                Спеціалізація
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  disabled={isCategoriesLoading}
                  defaultValue={category}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {categories?.map((category) => (
                      <SelectGroup key={category.name}>
                        <SelectLabel>{category.name}</SelectLabel>
                        {category.subcategories.map((subcategory) => (
                          <SelectItem value={subcategory.name} key={subcategory.id}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div>
          <FormItem className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <div className="h-full pt-2 sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
              <FormLabel className="text-base font-semibold">Навички</FormLabel>
              <FormDescription>
                Додаткові ключові слова що допоможуть рекрутерам знайти вас в пошуку кандидатів
              </FormDescription>
            </div>
            <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
              <FormControl>
                <EditCandidateSkills candidateId={candidateId} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        </div>

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                Досвід роботи
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Slider
                    defaultValue={[experience]}
                    max={11}
                    step={1}
                    onValueChange={(values) => field.onChange(values[0])}
                    className="mb-2"
                  />
                </FormControl>
                <FormMessage />
                <span className="text-sm">{formatExperience(field.value)}</span>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expectations"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <div className="h-full pt-2 sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                <FormLabel className="text-base font-semibold">Зарплатні очікування</FormLabel>
                <FormDescription>Сума &quot;на руки&quot;, після сплати податків</FormDescription>
              </div>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <div className="flex items-center">
                    <span className="h-10 rounded-l-md bg-gray-300 px-3 py-1">
                      <DollarSign className="text-gray-dark h-full w-4" />
                    </span>
                    <Input
                      className="rounded-es-none rounded-ss-none border-l-0 text-base"
                      onChange={(event) => field.onChange(+event.target.value)}
                      value={field.value}
                      ref={field.ref}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <div className="h-full pt-2 sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                <FormLabel className="text-base font-semibold">Місто перебування</FormLabel>
                <FormDescription>Місто, де ви зараз знаходитесь</FormDescription>
              </div>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <Select onValueChange={(value) => field.onChange(value)} defaultValue={city}>
                  <FormControl>
                    <SelectTrigger disabled={isCitiesLoading || isProfileLoading}>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {cities?.length &&
                      cities.map(({ city }) => (
                        <SelectItem value={city} key={city}>
                          {city}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormField
                  control={form.control}
                  name="isRelocate"
                  render={({ field }) => (
                    <FormItem className="mt-3 flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          defaultChecked={isRelocate}
                          onCheckedChange={field.onChange}
                          ref={field.ref}
                          checked={field.value}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal leading-none">
                        Розглядаю переїзд в інше місто
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="english"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <FormLabel className="h-full text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%] md:flex-1">
                Рівень англійської
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <EnglishLevelGroup />
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experienceDescr"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-start">
              <div className="h-full pt-2 sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                <FormLabel className="text-base font-semibold">Досвід роботи</FormLabel>
                <FormDescription>
                  Розкажіть, які проекти та задачі виконували, які технології використовували, ваша
                  роль у команді зараз, і куди бажаєте розвиватися.
                </FormDescription>
              </div>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Textarea rows={9} className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="achievementsDescr"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-start">
              <div className="h-full pt-2 sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                <FormLabel className="text-base font-semibold">Досягнення</FormLabel>
                <FormDescription>
                  Чим конкретніше, тим краще. Для цікавих пропозицій must have.
                </FormDescription>
              </div>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Textarea rows={5} className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expectationsDescr"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-start">
              <div className="h-full pt-2 sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                <FormLabel className="text-base font-semibold">Очікування</FormLabel>
                <FormDescription>
                  Напишіть, чого хочете від роботи. І чого не хочете теж напишіть.
                </FormDescription>
              </div>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Textarea rows={5} className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employmentOptions"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <FormLabel className="h-full text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%] md:flex-1">
                Варіанти зайнятості
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {convertEnumObjToArray(EmploymentOption).map((option: EmploymentOption) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="text-base">
                          {formatEmploymenOptions(option)}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                Погодинна ставка
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <div className="flex items-center">
                    <span className="h-10 rounded-l-md bg-gray-300 px-3 py-1">
                      <DollarSign className="text-gray-dark h-full w-4" />
                    </span>
                    <Input
                      className="rounded-es-none rounded-ss-none border-l-0 text-base"
                      onChange={(event) => field.onChange(+event.target.value)}
                      value={field.value}
                      ref={field.ref}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-3">
          <div className="h-full pt-2 sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%] ">
            <FormLabel className="text-base font-semibold ">🚫 Не розглядаю</FormLabel>
            <FormDescription>Рекрутери знатимуть, які вакансії не пропонувати</FormDescription>
          </div>
          <div className="flex w-full flex-col gap-4 sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
            <FormField
              control={form.control}
              name="blockedDomains"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Домени</FormLabel>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {isDomainsLoading &&
                      Array(14)
                        .fill(null)
                        .map(() => <Skeleton key={nanoid()} className="h-4 w-20" />)}
                    {domains?.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="blockedDomains"
                        render={({ field }) => (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                variant="destructive"
                                checked={field.value?.includes(String(item.name))}
                                onCheckedChange={(checked) =>
                                  checked
                                    ? field.onChange([...field.value!, item.name])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== String(item.name)),
                                      )
                                }
                                className="border-primary"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.name}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blockedTypes"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Типи компаній</FormLabel>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {convertEnumObjToArray(CompanyType).map((type) => (
                      <FormField
                        key={type}
                        control={form.control}
                        name="blockedTypes"
                        render={({ field }) => (
                          <FormItem
                            key={type}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(String(type))}
                                onCheckedChange={(checked) =>
                                  checked
                                    ? field.onChange([...field.value!, type])
                                    : field.onChange(field.value?.filter((value) => value !== type))
                                }
                                variant="destructive"
                                className="border-primary"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{type}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="employerQuestions"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-start">
              <div className="h-full pt-2 sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                <FormLabel className="text-base font-semibold">Питання для роботодавця</FormLabel>
                <FormDescription>Що саме ви хотіли б дізнатись в першу чергу?</FormDescription>
              </div>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Textarea rows={5} className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferableLang"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <div className="h-full sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%] md:flex-1">
                <FormLabel className="text-base font-semibold">Бажана мова спілкування</FormLabel>
                <FormDescription>
                  Ми повідомимо роботодавця якою мовою вам зручніше спілкуватися.
                </FormDescription>
              </div>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap space-x-1"
                  >
                    {convertEnumObjToArray(PreferableLanguage).map((lang: PreferableLanguage) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={lang} />
                        </FormControl>
                        <FormLabel className="text-base">{lang}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="communicateMethod"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-center">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                Бажаний спосіб спілкування
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={communicateMethod}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {convertEnumObjToArray(CommunicateMethod).map((method: CommunicateMethod) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-center">
          <div className="sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]" />
          <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
            <Button size="lg" type="submit" className="w-full text-xl">
              Оновити профіль
            </Button>

            <Link
              href="/my/kill"
              className="hover:text-destructive text-gray mt-8 inline-flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" /> Видалити аккаунт
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CandidateProfile;
