# Markprompt React

A headless React component for building a prompt interface, based on the [Markprompt](https://markprompt.com) API.

<br />
<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/markprompt">
    <img alt="" src="https://badgen.net/npm/v/markprompt">
  </a>
  <a aria-label="License" href="https://github.com/motifland/markprompt/blob/main/LICENSE">
    <img alt="" src="https://badgen.net/npm/license/markprompt">
  </a>
</p>

## Installation

Check out the starter template for a fully working example: [Markprompt starter template](href="https://github.com/motifland/markprompt-starter-template).

In [Motif](https://motif.land), paste the following import statement in an MDX, JSX or TSX file:

```jsx
import { Markprompt } from 'https://esm.sh/markprompt';
```

If you have a Node-based setup, install the `markprompt` package via npm or yarn:

```sh
# npm
npm install markprompt

# Yarn
yarn add markprompt
```

## Usage

Example:

```jsx
import { Markprompt } from '@markprompt/react';

function MyPrompt() {
  return <Markprompt projectKey="<project-key>" model="gpt-4" />;
}
```

where `project-key` can be obtained in your project settings, and `model` is the identifier of the OpenAI model to use for completions. Supported models are:

- Chat completions: `gpt-4` `gpt-4-0314` `gpt-4-32k` `gpt-4-32k-0314` `gpt-3.5-turbo` `gpt-3.5-turbo-0301`
- Completions: `text-davinci-003`, `text-davinci-002`, `text-curie-001`, `text-babbage-001`, `text-ada-001`, `davinci`, `curie`, `babbage`, `ada`

If no model is specified, `gpt-3.5-turbo` will be used.

## Styling

The Markprompt component is styled using [Tailwind CSS](https://tailwindcss.com/), and therefore requires a working Tailwind configuration. We are planning to make it headless, for more flexible options.

## Configuration

You can pass the following props to the component:

| Prop               | Default value                              | Description                                                                                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectKey`       |                                            | Your project&apos;s API key, found in the project settings.                                                                                                                                                                                                                            |
| `model`            | `gpt-3.5-turbo`                            | The OpenAI completions model to use. Supported values: `gpt-4`, `gpt-4-0314`, `gpt-4-32k`, `gpt-4-32k-0314`, `gpt-3.5-turbo`, `gpt-3.5-turbo-0301`, `text-davinci-003`, `text-davinci-002`, `text-curie-001`, `text-babbage-001`, `text-ada-001`, `davinci`, `curie`, `babbage`, `ada` |
| settings.          |
| `iDontKnowMessage` | _Sorry, I am not sure how to answer that._ | Fallback message in can no answer is found.                                                                                                                                                                                                                                            |
| `placeholder`      | _Ask me anything..._                       | Message to show in the input box when no text has been entered.                                                                                                                                                                                                                        |

Example:

```jsx
<Markprompt
  projectKey="..."
  model="..."
  iDontKnowMessage="Sorry, I don't know!"
  placeholder="Ask Acme docs..."
/>
```

## Whitelisting your domain

Usage of the [Markprompt API](https://markprompt.com) is subject to quotas, depending on the plan you have subscribed to. Markprompt has systems in place to detect abuse and excessive usage, but we nevertheless recommend being cautious when offering a prompt interface on a public website. In any case, when using the production project key, the prompt will **only work on domains you have whitelisted** through the [Markprompt dashboard](https://markprompt.com).

### Local development

When developing locally, for instance on localhost, use the development test key instead. This allows you to access the API from a non-whitelisted domain. For that reason, **make sure to keep this key private**.

## Starter Template

For a fully working setup based on Next.js + Tailwind, check out the [Markprompt starter template](https://github.com/motifland/markprompt-starter-template).

## Community

- [Twitter @markprompt](https://twitter.com/markprompt)
- [Twitter @motifland](https://twitter.com/motifland)
- [Discord](https://discord.gg/MBMh4apz6X)

## Authors

This library is created by the team behind [Motif](https://motif.land)
([@motifland](https://twitter.com/motifland)).

## License

MIT