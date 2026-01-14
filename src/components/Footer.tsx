const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Directory — A comprehensive resource hub
          </p>
          <p className="text-xs text-muted-foreground">
            Ready for JSON/RSS/API integration via RovoDev
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
