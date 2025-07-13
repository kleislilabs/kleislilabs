interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div 
      className="max-w-none 
        [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8
        [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:mb-5 [&>h2]:mt-8
        [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:mb-4 [&>h3]:mt-6
        [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:mb-3 [&>h4]:mt-5
        [&>h5]:text-lg [&>h5]:font-semibold [&>h5]:mb-3 [&>h5]:mt-4
        [&>h6]:text-base [&>h6]:font-semibold [&>h6]:mb-2 [&>h6]:mt-4
        [&>p]:mb-4 [&>p]:leading-7
        [&>ul]:mb-4 [&>ul]:pl-6 [&>ul]:space-y-2
        [&>ol]:mb-4 [&>ol]:pl-6 [&>ol]:space-y-2
        [&>li]:leading-7
        [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:mb-4
        [&>pre]:bg-muted [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:mb-4 [&>pre]:overflow-x-auto
        [&>code]:bg-muted [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm
        [&>img]:rounded-lg [&>img]:shadow-lg [&>img]:mb-4
        [&>table]:w-full [&>table]:border-collapse [&>table]:mb-4
        [&>th]:border [&>th]:border-border [&>th]:bg-muted [&>th]:p-2
        [&>td]:border [&>td]:border-border [&>td]:p-2
        [&>a]:text-primary [&>a]:no-underline [&>a:hover]:underline"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
