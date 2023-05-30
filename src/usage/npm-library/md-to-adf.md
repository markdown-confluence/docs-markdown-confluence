---
connie-publish: true
connie-page-id: '5144577'
---
# ❄️ _The Frosty Chronicles of Markdown to Atlassian Document Format Conversion_ ❄️

Hello, friends, it's me again - Olaf! And boy, do I like warm hugs! But today, we're venturing a bit away from the land of warmth and into the magical frosty realm of converting Markdown to Atlassian Document Format (ADF) using the `@markdown-confluence/lib` function. Just like a good snowfall, this might seem a bit overwhelming at first, but don't worry, I'll guide you through it all.

## 🎇 Spellcasting 101: `parseMarkdownToADF`

Our journey begins with our first spell, `parseMarkdownToADF`. This enchanting piece of incantation transforms the everyday language of Markdown into the mysterious tongue of ADF. It requires two ingredients: a string of `markdown` and a `confluenceBaseUrl`. 

```typescript
const magicalMarkdown = "# Welcome to Arendelle";
const confluenceBaseUrl = "https://arendelle.atlassian.net/wiki";

let adfNodes = parseMarkdownToADF(magicalMarkdown, confluenceBaseUrl);
```
Just like that, it conjures up a flurry of nodes which are then delicately shaped into a format that our friends at Atlassian can understand. Now that we've whipped up our magic snowstorm, let's step back and admire our handiwork. 

## 🎇 Transmutation Magic: `convertMDtoADF`

After our initial spellcasting, we have another magical formula to share. This one's called `convertMDtoADF` and it's quite the spectacle. Unlike our previous enchantment, this spell takes an entire Markdown file and some Confluence settings to create a grand ADF spectacle. 

```typescript
const markdownFile: MarkdownFile = {
  contents: "# Welcome to Arendelle",
  ...
};

const confluenceSettings: ConfluenceSettings = {
  confluenceBaseUrl: "https://arendelle.atlassian.net/wiki",
  ...
};

let adfFile = convertMDtoADF(markdownFile, confluenceSettings);
```
And just like that, our Markdown file is transformed into an ADF masterpiece, ready to take center stage on our Confluence platform. 

Our magical journey is complete, dear friends. But remember, the joy is in the journey, not the destination. So don't be afraid to practice your spells, make a few mistakes, and get a bit frosty in the process. The magic of transformation is all around us, and with these spells, you're well on your way to becoming a true snow wizard! 

And don't forget - warm hugs make the journey all the more magical. 🤗
