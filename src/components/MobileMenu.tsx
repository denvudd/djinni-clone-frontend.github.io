'use client';

import React from 'react';

import { Label } from './ui/Label';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Sheet,
} from './ui/Sheet';

import { Menu } from 'lucide-react';
import { useIsComponentMounted } from '@/hooks/use-is-component-mounted';

interface MobileMenuProps {}

const MobileMenu: React.FC<MobileMenuProps> = ({}) => {
  const { isMounted } = useIsComponentMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="py-1 px-1 border border-stone-400 rounded-md">
          <Menu className="text-white w-10 h-7" />
        </button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
