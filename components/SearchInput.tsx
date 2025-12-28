'use client'

import Image from 'next/image';
import { usePathname , useRouter , useSearchParams} from 'next/navigation';
import { useEffect, useState } from 'react';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
// import { setTimeout } from 'timers/promises';

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get('topic') || '';

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
      const delayDebounce = setTimeout(() => { 
          // 1. نقوم بتنظيف النص من المسافات في البداية والنهاية
          const trimmedQuery = searchQuery.trim();

          // 2. نتحقق هل يوجد نص حقيقي بعد التنظيف؟
          if (trimmedQuery) {
              const newUrl = formUrlQuery({
                  params: searchParams.toString(),
                  key: 'topic',
                  value: trimmedQuery, // نرسل النص النظيف للرابط
              });

              router.push(newUrl, { scroll: false });
          } 
          else {
              // 3. إذا كان النص فارغاً أو مجرد مسافات، نحذف المفتاح تماماً
              if (pathname === '/companions') {
                  const newUrl = removeKeysFromUrlQuery({
                      params: searchParams.toString(),
                      keysToRemove: ['topic'],
                  });

                  router.push(newUrl, { scroll: false });
              }
          }
      }, 500);

      return () => clearTimeout(delayDebounce);
  }, [searchQuery, router, searchParams, pathname]);
  
  
  return (
    <div className='relative border border-black rounded-lg
     items-center flex gap-2 px-2 py-1 h-fit '>
      <Image src='./icons/search.svg' alt='search' 
       width={15} height={15} 
       />
       <input 
        
        placeholder='Search companions...'
        className='outline-none'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        >

        </input>
    </div>
  )
}

export default SearchInput