import { withErrorBoundary, withSuspense } from '@extension/shared';
import Input from '@src/components/Input';
import { useEffect, useState } from 'react';

function Popup() {
  const [link, setLink] = useState('');

  const logo = 'popup/logo.svg';
  const goGithubSite = () => chrome.tabs.create({ url: 'https://buildone.me' });

  useEffect(() => {
    const getPageUrl = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const { url } = tabs[0];
        setLink(url!);
      });
    };
    getPageUrl();
  }, []);

  return (
    <div className="w-full h-full px-16 py-24">
      <header className="text-gray-900">
        <button onClick={goGithubSite}>
          <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
        </button>
      </header>
      <main className="mt-16">
        <form className="flex flex-col gap-16">
          <Input id="link" value={link} readOnly />
          <Input id="title" placeholder="할 일의 제목을 적어주세요." />
          {/*목표 선택은 추후에 구현*/}
        </form>
      </main>
    </div>
  );
}

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
