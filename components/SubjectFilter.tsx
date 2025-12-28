'use client'

import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { subjects } from "@/constants";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const SubjectFilter = () => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get('subject') || '';

  const [select, setSelect] = useState('');
  
  useEffect(() => {
      let newUrl = '';
      if (select === 'all') {
        newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['subject'],
        });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'subject',
          value: select,
        });
      }
      router.push(newUrl , {scroll: false}) ;
    }, [select]);
    

  return (
        <Select onValueChange={setSelect} value={select}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default SubjectFilter