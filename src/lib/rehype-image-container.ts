import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import { parseImageTitle, getImageContainerClasses } from './image-utils';

interface ElementNode extends Node {
  type: 'element';
  tagName: string;
  properties: Record<string, string | number | boolean | string[]>;
  children?: Node[];
}

export function rehypeImageContainer() {
  return (tree: Node) => {
    visit(tree, 'element', (node: ElementNode, index: number | null, parent: ElementNode | null) => {
      if (
        node.tagName === 'img' &&
        parent &&
        parent.tagName === 'p' &&
        parent.children &&
        parent.children.length === 1
      ) {
        const { src, alt, title } = node.properties;
        
        const { imageTitle, description } = parseImageTitle(typeof title === 'string' ? title : undefined);
        
        const imageContainer = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['image-container-wrapper', 'my-6', 'sm:my-8']
          },
          children: [
            {
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['overflow-hidden', 'border-2', 'border-border/30', 'shadow-lg', 'rounded-2xl', 'bg-card', 'hover:shadow-xl', 'hover:border-border/50', 'transition-all', 'duration-300', 'group']
              },
              children: [
                {
                  type: 'element',
                  tagName: 'div',
                  properties: {
                    className: ['relative']
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'img',
                      properties: {
                        src: src as string,
                        alt: (alt as string) || imageTitle || 'Image',
                        className: getImageContainerClasses(!!(imageTitle || description)),
                        loading: 'lazy',
                        width: '800',
                        height: '600'
                      }
                    },
                    // Add overlay title if title exists but no description
                    ...(imageTitle && !description ? [{
                      type: 'element',
                      tagName: 'div',
                      properties: {
                        className: ['absolute', 'bottom-0', 'left-0', 'right-0', 'bg-gradient-to-t', 'from-black/80', 'via-black/50', 'to-transparent', 'p-4', 'sm:p-6', 'rounded-b-2xl']
                      },
                      children: [{
                        type: 'element',
                        tagName: 'h3',
                        properties: {
                          className: ['text-white', 'font-semibold', 'text-sm', 'sm:text-base', 'leading-tight']
                        },
                        children: [{
                          type: 'text',
                          value: imageTitle
                        }]
                      }]
                    }] : [])
                  ]
                },
                ...((imageTitle || description) && description ? [{
                  type: 'element',
                  tagName: 'div',
                  properties: {
                    className: ['p-4', 'sm:p-6', 'bg-muted/20', 'border-t', 'border-border/30']
                  },
                  children: [
                    ...(imageTitle ? [{
                      type: 'element',
                      tagName: 'h3',
                      properties: {
                        className: ['font-semibold', 'text-base', 'sm:text-lg', 'mb-2', 'text-foreground']
                      },
                      children: [{
                        type: 'text',
                        value: imageTitle
                      }]
                    }] : []),
                    ...(description ? [{
                      type: 'element',
                      tagName: 'p',
                      properties: {
                        className: ['text-sm', 'sm:text-base', 'text-muted-foreground', 'leading-relaxed']
                      },
                      children: [{
                        type: 'text',
                        value: description
                      }]
                    }] : [])
                  ]
                }] : [])
              ]
            }
          ]
        };
        
        if (parent && index !== null && typeof index === 'number' && parent.children) {
          parent.children[index] = imageContainer;
        }
      }
    });
  };
}
