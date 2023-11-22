import * as React from 'react';
import {Preview} from '@storybook/react';
import {Provider, GlobalCss} from 'nano-theme';
import {useStoryContext} from '@storybook/addons';

import 'nano-theme/lib/global-reset';

const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      const isLight = String(useStoryContext()?.globals?.backgrounds?.value)[1].toLowerCase() === 'f';
      return (
        <Provider theme={!isLight ? 'dark' : 'light'}>
          <GlobalCss />
          <Story />
        </Provider>
      );
    },
  ],
};

export default preview;
