---
connie-publish: true
connie-page-id: '1409446'
---
## Image Uploads: Bedrock's Picto-Rama: Rockin' Pages with Dino-Sized Fun

Unleash your inner caveman and include images in your markdown-confluence pages with both wikilinks and regular markdown styles. They'll search high and low for the right file, just like a hungry dinosaur on the hunt.

Here are the two markdown formats for adding images:

```md
![[cave_painting.png]]
```
or 
```md
![](images/dinosaur.png)
```

Paths for these images are always relative to the markdown file they're in, so you'll never lose your way in the Bedrock wilderness.

Need to grab a file from another folder? Use `../` like this:

```md
![](../other_cave/images/sabertooth.png)
```

## Dino-Sized Attachments Adventure

Whoa, hold onto your dino-sized hats! When you add images to a page, they'll hitch a ride as attachments for that specific page in Confluence, just like a pterodactyl flying through the sky. And if the same image struts its stuff on multiple pages, it'll be attached to each one, spreading prehistoric cheer all around!

### No More Duplicate Dino Images!

To avoid fetching the image from Confluence every time you run the publish process, our plugin uses the hash (MD5) of the image file and stores it as a comment on the attachment. This way, images are only uploaded once per page and updated only when the contents change.

To prevent name clashes when uploading images to Confluence, we use this unique naming convention:

```
${Absolute Path MD5}-${Filename without path}
```

This ensures each image has a unique identifier, just like a dino's footprint.

### Limitations

Currently, our Confluence Integration plugin can't delete images from Confluence. But hey, neither could Fred Flintstone!

### References

- [Embed an image in a note - Obsidian Help](https://help.obsidian.md/Linking+notes+and+files/Embedding+files#Embed+an+image+in+a+note)
- [Manage uploaded files - Atlassian Support](https://support.atlassian.com/confluence-cloud/docs/manage-uploaded-files/)

Now you're ready to make your documentation a modern Stone Age masterpiece!
