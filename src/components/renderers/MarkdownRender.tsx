/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/heading-has-content */
const Heading1 = ({ ...props }) => <h1 className="text-2xl font-semibold my-2" {...props} />;
const Heading2 = ({ ...props }) => <h2 className="text-2xl font-semibold my-2" {...props} />;
const Heading3 = ({ ...props }) => <h3 className="text-2xl font-semibold my-2" {...props} />;
const Heading4 = ({ ...props }) => <h3 className="text-xl font-semibold my-2" {...props} />;
const Heading5 = ({ ...props }) => <h3 className="text-lg font-medium my-2" {...props} />;
const Heading6 = ({ ...props }) => <h3 className="text-md font-medium my-2" {...props} />;
const Anchor = ({ ...props }) => <a className="text-link" {...props} />;
const OrderedList = ({ ...props }) => <ol className="pl-2 mb-2 list-decimal" {...props} />;

const UnorderedList = ({ ...props }) => <ul className="pl-2 mb-2 list-disc" {...props} />;

const Paragraph = ({ ...props }) => <p className="mb-2" {...props} />;

export const MarkdownRender = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  a: Anchor,
  ol: OrderedList,
  ul: UnorderedList,
  p: Paragraph,
};
