interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <article 
      className="prose prose-lg max-w-none
        [&>h1]:text-3xl sm:[&>h1]:text-4xl lg:[&>h1]:text-5xl [&>h1]:font-bold [&>h1]:mb-6 sm:[&>h1]:mb-8 [&>h1]:mt-8 sm:[&>h1]:mt-12 [&>h1]:leading-tight
        [&>h2]:text-2xl sm:[&>h2]:text-3xl lg:[&>h2]:text-4xl [&>h2]:font-bold [&>h2]:mb-5 sm:[&>h2]:mb-6 [&>h2]:mt-8 sm:[&>h2]:mt-10 [&>h2]:leading-tight
        [&>h3]:text-xl sm:[&>h3]:text-2xl lg:[&>h3]:text-3xl [&>h3]:font-semibold [&>h3]:mb-4 sm:[&>h3]:mb-5 [&>h3]:mt-6 sm:[&>h3]:mt-8 [&>h3]:leading-tight
        [&>h4]:text-lg sm:[&>h4]:text-xl lg:[&>h4]:text-2xl [&>h4]:font-semibold [&>h4]:mb-4 [&>h4]:mt-6 sm:[&>h4]:mt-7 [&>h4]:leading-tight
        [&>h5]:text-base sm:[&>h5]:text-lg lg:[&>h5]:text-xl [&>h5]:font-semibold [&>h5]:mb-3 sm:[&>h5]:mb-4 [&>h5]:mt-5 sm:[&>h5]:mt-6 [&>h5]:leading-tight
        [&>h6]:text-sm sm:[&>h6]:text-base lg:[&>h6]:text-lg [&>h6]:font-semibold [&>h6]:mb-3 [&>h6]:mt-4 sm:[&>h6]:mt-5 [&>h6]:leading-tight
        [&>p]:mb-5 sm:[&>p]:mb-6 [&>p]:leading-7 sm:[&>p]:leading-8 [&>p]:text-base sm:[&>p]:text-lg [&>p]:text-foreground/90
        [&>ul]:mb-5 sm:[&>ul]:mb-6 [&>ul]:pl-6 sm:[&>ul]:pl-8 [&>ul]:space-y-2 sm:[&>ul]:space-y-3
        [&>ol]:mb-5 sm:[&>ol]:mb-6 [&>ol]:pl-6 sm:[&>ol]:pl-8 [&>ol]:space-y-2 sm:[&>ol]:space-y-3
        [&>li]:leading-7 sm:[&>li]:leading-8 [&>li]:text-base sm:[&>li]:text-lg [&>li]:text-foreground/90
        [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-6 sm:[&>blockquote]:pl-8 [&>blockquote]:py-4 [&>blockquote]:bg-muted/30 [&>blockquote]:rounded-r-lg [&>blockquote]:italic [&>blockquote]:mb-6 sm:[&>blockquote]:mb-8 [&>blockquote]:text-base sm:[&>blockquote]:text-lg [&>blockquote]:leading-7 sm:[&>blockquote]:leading-8
        [&>pre]:bg-muted/50 [&>pre]:border [&>pre]:p-4 sm:[&>pre]:p-6 [&>pre]:rounded-xl [&>pre]:mb-6 sm:[&>pre]:mb-8 [&>pre]:overflow-x-auto [&>pre]:text-sm sm:[&>pre]:text-base [&>pre]:leading-6 [&>pre]:shadow-sm
        [&>code]:bg-muted/60 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded-md [&>code]:text-sm sm:[&>code]:text-base [&>code]:font-mono [&>code]:border
        [&>.image-container-wrapper]:my-8 sm:[&>.image-container-wrapper]:my-10
        [&>.image-container-wrapper>div]:rounded-2xl [&>.image-container-wrapper>div]:border-2 [&>.image-container-wrapper>div]:border-border/30
        [&>.image-container-wrapper>div:hover]:shadow-xl [&>.image-container-wrapper>div:hover]:border-border/50
        [&>table]:w-full [&>table]:border-collapse [&>table]:mb-6 sm:[&>table]:mb-8 [&>table]:text-sm sm:[&>table]:text-base [&>table]:shadow-sm [&>table]:rounded-lg [&>table]:overflow-hidden [&>table]:border
        [&>th]:border [&>th]:border-border [&>th]:bg-muted/50 [&>th]:p-3 sm:[&>th]:p-4 [&>th]:text-sm sm:[&>th]:text-base [&>th]:font-semibold [&>th]:text-left
        [&>td]:border [&>td]:border-border [&>td]:p-3 sm:[&>td]:p-4 [&>td]:text-sm sm:[&>td]:text-base
        [&>a]:text-primary [&>a]:no-underline [&>a:hover]:underline [&>a]:break-words [&>a]:font-medium [&>a]:transition-colors [&>a:hover]:text-primary/80
        [&>hr]:my-8 sm:[&>hr]:my-12 [&>hr]:border-border [&>hr]:border-t-2"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
