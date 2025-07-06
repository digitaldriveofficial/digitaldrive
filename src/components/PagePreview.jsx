import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Copy, Download, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const PagePreview = ({ page, onBackToAdmin }) => {
  const publicUrl = `${window.location.origin}/page/${page.id}`;

  const handleTileClick = (tile) => {
    if (tile.link_url) {
      if (tile.link_type === "external") {
        window.open(tile.link_url, "_blank");
      } else {
        toast({
          title: "🚧 Internal navigation is for live pages!",
          description: "This link will work on the public page.",
        });
      }
    } else {
      toast({
        title: "No Link Set! 🔗",
        description: "This tile doesn't have a link configured.",
      });
    }
  };

  const copyPublicUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    toast({
      title: "Public URL Copied! 📋",
      description: "You can now share this link with anyone.",
    });
  };

  const exportPage = async () => {
    toast({
      title: "Exporting Page...",
      description: "Preparing your HTML file for download.",
    });

    try {
      const pageHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${page.title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Inter', sans-serif; }
          .dynamic-text { color: ${page.header_color}; }
          .dynamic-accent-bg { background-color: ${page.accent_color}20; }
          .dynamic-accent-text { color: ${page.accent_color}; }
        </style>
      </head>
              <body style="background: linear-gradient(135deg, ${page.header_color}20, ${page.accent_color}20)">
         
          <nav class="bg-white shadow-sm sticky top-0 z-50 w-full border-b border-primary/20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between h-16 items-center">
                <a class="flex items-center space-x-2" href="/">
                  <img src="https://digitaldrive.pk/assets/logo-1b56a6c7.jpg" alt="Digital Drive Logo" class="h-8 w-8">
                  <span class="text-xl font-semibold text-primary">Digital Drive</span>
                </a>
                <div class="hidden md:flex items-center space-x-3">
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors duration-200 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span class="sr-only">LinkedIn</span>
                  </a>
                  <a href="https://linkedin-smartleads.com/auth?mode=login" class="text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200 px-3 py-2 text-sm rounded-md">Log In</a>
                  <a href="https://linkedin-smartleads.com/auth?mode=signup" class="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform duration-200 hover:scale-105 px-3 py-2 text-sm rounded-md">Sign Up</a>
                </div>
                <div class="md:hidden">
                  <button class="text-muted-foreground hover:text-primary focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                      <line x1="4" x2="20" y1="12" y2="12"></line>
                      <line x1="4" x2="20" y1="6" y2="6"></line>
                      <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          
          <div class="container min-h-screen mx-auto px-4 py-8">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 dynamic-text">${
              page.title
            }</h1>
            ${
              page.description
                ? `<p class="text-xl max-w-2xl mx-auto text-gray-600">${page.description}</p>`
                : ""
            }
          </div>

          ${
            page.feature_image
              ? `
          <div class="mb-12">
            <img src="${page.feature_image}" alt="${page.title}" class="w-full max-h-[400px] object-cover rounded-2xl shadow-lg" />
          </div>`
              : ""
          }

          ${
            page.tiles.length > 0
              ? `
          <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${page.tiles
              .map(
                (tile) => `
              <div class="bg-white rounded-2xl shadow-lg overflow-hidden group h-full flex flex-col">
                ${
                  tile.image_url
                    ? `<div class="aspect-video overflow-hidden"><img src="${tile.image_url}" alt="${tile.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></div>`
                    : ""
                }
                <div class="p-6 flex-grow flex flex-col">
                  <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">${
                    tile.title
                  }</h3>
                  ${
                    tile.description
                      ? `<p class="text-gray-600 mb-4 line-clamp-3 flex-grow">${tile.description}</p>`
                      : ""
                  }
                  ${
                    tile.link_url
                      ? `
                  <div class="flex items-center justify-between mt-auto pt-4">
                    <span class="text-sm font-medium px-3 py-1 rounded-full dynamic-accent-bg dynamic-accent-text">
                      ${
                        tile.link_type === "external"
                          ? "External Link"
                          : "Internal Page"
                      }
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${
                      page.accent_color
                    }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50 group-hover:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>
            `
              )
              .join("")}
          </div>
          `
              : `
          <div class="text-center py-20">
            <div style="font-size: 4rem; margin-bottom: 1rem;">📄</div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">No Tiles Added</h2>
            <p class="text-gray-600">This page doesn't have any tiles yet.</p>
          </div>
          `
          }
        </div>
        <footer class="bg-white py-6 mt-auto border-t border-border/40">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div class="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-3">
                <a href="https://www.digitaldrive.pk" target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-primary hover:underline">Digital Drive</a>
                <a href="mailto:hello@digitaldrive.pk" class="text-sm text-muted-foreground hover:text-primary hover:underline">hello@digitaldrive.pk</a>
                <a href="https://www.linkedin.com/company/digital-drive-pk/?viewAsMember=true" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors duration-200" aria-label="Digital Drive LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
              <p class="text-xs text-muted-foreground/80">© 2025 Digital Drive. All rights reserved.</p>
            </div>
          </footer>
      </body>
      </html>
      `;

      const blob = new Blob([pageHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        page.title.replace(/\s+/g, "-").toLowerCase() || "page"
      }.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Page Exported! 🚀",
        description: "Your page has been downloaded as an HTML file.",
      });
    } catch (error) {
      console.error("Failed to export page:", error);
      toast({
        variant: "destructive",
        title: "Export Failed! 😢",
        description: "Something went wrong while exporting your page.",
      });
    }
  };

  const ActionBar = () => (
    <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBackToAdmin}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
            <div>
              <h1 className="font-semibold text-gray-900">
                {page.title} Preview
              </h1>
              <p className="text-sm text-gray-500 capitalize">
                {page.type} Page
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(publicUrl, "_blank")}
              className="text-gray-600"
            >
              <Globe className="w-4 h-4 mr-2" />
              Open Public Page
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyPublicUrl}
              className="text-gray-600"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy URL
            </Button>
            <Button
              size="sm"
              onClick={exportPage}
              className="text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Export HTML
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${page.header_color}20, ${page.accent_color}20)`,
      }}
    >
      {<ActionBar />}

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
          style={{ color: page.header_color }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{page.title}</h1>
          {page.description && (
            <p className="text-xl max-w-2xl mx-auto opacity-80">
              {page.description}
            </p>
          )}
        </motion.div>

        {page.featureImage && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <img
              src={page.feature_image}
              alt={page.title}
              className="w-full max-h-[400px] object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
        )}

        {page.tiles.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {page.tiles.map((tile, index) => (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                onClick={() => handleTileClick(tile)}
              >
                {tile.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={tile.image_url}
                      alt={tile.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tile.title}
                  </h3>
                  {tile.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {tile.description}
                    </p>
                  )}

                  {tile.link_url && (
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-medium px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${page.accent_color}20`,
                          color: page.accent_color,
                        }}
                      >
                        {tile.link_type === "external"
                          ? "External Link"
                          : "Internal Page"}
                      </span>
                      <ExternalLink
                        className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
                        style={{ color: page.accent_color }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📄</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Tiles Added
            </h2>
            <p className="text-gray-600 mb-6">
              This page doesn't have any tiles yet.
            </p>
            <Button
              onClick={onBackToAdmin}
              className="text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              Add Tiles in Admin Panel
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PagePreview;
