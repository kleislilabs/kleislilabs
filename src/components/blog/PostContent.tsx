interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div 
      className="max-w-none 
        [&>h1]:text-2xl sm:[&>h1]:text-3xl lg:[&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-4 sm:[&>h1]:mb-6 [&>h1]:mt-6 sm:[&>h1]:mt-8
        [&>h2]:text-xl sm:[&>h2]:text-2xl lg:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:mb-4 sm:[&>h2]:mb-5 [&>h2]:mt-6 sm:[&>h2]:mt-8
        [&>h3]:text-lg sm:[&>h3]:text-xl lg:[&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:mb-3 sm:[&>h3]:mb-4 [&>h3]:mt-5 sm:[&>h3]:mt-6
        [&>h4]:text-base sm:[&>h4]:text-lg lg:[&>h4]:text-xl [&>h4]:font-semibold [&>h4]:mb-3 [&>h4]:mt-4 sm:[&>h4]:mt-5
        [&>h5]:text-sm sm:[&>h5]:text-base lg:[&>h5]:text-lg [&>h5]:font-semibold [&>h5]:mb-2 sm:[&>h5]:mb-3 [&>h5]:mt-3 sm:[&>h5]:mt-4
        [&>h6]:text-sm sm:[&>h6]:text-base [&>h6]:font-semibold [&>h6]:mb-2 [&>h6]:mt-3 sm:[&>h6]:mt-4
        [&>p]:mb-3 sm:[&>p]:mb-4 [&>p]:leading-6 sm:[&>p]:leading-7 [&>p]:text-sm sm:[&>p]:text-base
        [&>ul]:mb-3 sm:[&>ul]:mb-4 [&>ul]:pl-4 sm:[&>ul]:pl-6 [&>ul]:space-y-1 sm:[&>ul]:space-y-2
        [&>ol]:mb-3 sm:[&>ol]:mb-4 [&>ol]:pl-4 sm:[&>ol]:pl-6 [&>ol]:space-y-1 sm:[&>ol]:space-y-2
        [&>li]:leading-6 sm:[&>li]:leading-7 [&>li]:text-sm sm:[&>li]:text-base
        [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-3 sm:[&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:mb-3 sm:[&>blockquote]:mb-4 [&>blockquote]:text-sm sm:[&>blockquote]:text-base
        [&>pre]:bg-muted [&>pre]:p-3 sm:[&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:mb-3 sm:[&>pre]:mb-4 [&>pre]:overflow-x-auto [&>pre]:text-xs sm:[&>pre]:text-sm
        [&>code]:bg-muted [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs sm:[&>code]:text-sm
        [&>img]:rounded-lg [&>img]:shadow-lg [&>img]:mb-3 sm:[&>img]:mb-4 [&>img]:w-full [&>img]:h-auto
        [&>table]:w-full [&>table]:border-collapse [&>table]:mb-3 sm:[&>table]:mb-4 [&>table]:text-xs sm:[&>table]:text-sm [&>table]:overflow-x-auto [&>table]:block sm:[&>table]:table
        [&>th]:border [&>th]:border-border [&>th]:bg-muted [&>th]:p-1 sm:[&>th]:p-2 [&>th]:text-xs sm:[&>th]:text-sm
        [&>td]:border [&>td]:border-border [&>td]:p-1 sm:[&>td]:p-2 [&>td]:text-xs sm:[&>td]:text-sm
        [&>a]:text-primary [&>a]:no-underline [&>a:hover]:underline [&>a]:break-words"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
