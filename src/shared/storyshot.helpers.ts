import initStoryshots from '@storybook/addon-storyshots';
import { render } from '@testing-library/react';

export function creatStorySnapShots(storyKindRegex: RegExp | string) {
  initStoryshots({
    asyncJest: true,
    storyKindRegex,
    test: ({ story, done }) => {
      const view = render(story.render());
      expect(view.container).toMatchSnapshot();

      if (done) {
        done();
      }
    }
  });
}
