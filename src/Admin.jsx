import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminPanel from "@/components/AdminPanel";
import PagePreview from "@/components/PagePreview";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { pagesService, tilesService } from "@/lib/pagesService";
import Loading from "./components/Loading";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";

export default function Admin() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user } = useAuth();

  const loadPages = async () => {
    try {
      const pagesData = await pagesService.getPages(user.id);
      const pagesWithTiles = await Promise.all(
        pagesData.map(async (page) => {
          const tiles = await tilesService.getTiles(page.id, user.id);
          return { ...page, tiles };
        })
      );
      setPages(pagesWithTiles);
    } catch (error) {
      console.error("Failed to load pages from Supabase", error);
      toast({
        variant: "destructive",
        title: "Error Loading Data",
        description: "Could not load pages from the database.",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPages();
  }, []);

  const createNewPage = async (pageData) => {
    try {
      const newPage = await pagesService.createPage(pageData, user.id);
      setPages([...pages, { ...newPage, tiles: [] }]);
      toast({
        title: "Page Created! 🎉",
        description: `${pageData.title} page has been created.`,
      });
    } catch (error) {
      console.error("Failed to create page:", error);
      toast({
        variant: "destructive",
        title: "Error Creating Page",
        description: "Could not create the page. Please try again.",
      });
    }
  };

  const updatePage = async (pageId, pageData) => {
    try {
      await pagesService.updatePage(pageId, pageData, user.id);
      setPages(pages.map((p) => (p.id === pageId ? { ...p, ...pageData } : p)));
      toast({
        title: "Page Updated! ✨",
        description: "Your page has been updated.",
      });
    } catch (error) {
      console.error("Failed to update page:", error);
      toast({
        variant: "destructive",
        title: "Error Updating Page",
        description: "Could not update the page. Please try again.",
      });
    }
  };

  const deletePage = async (pageId) => {
    try {
      await pagesService.deletePage(pageId, user.id);
      setPages(pages.filter((p) => p.id !== pageId));
      toast({
        title: "Page Deleted! 🗑️",
        description: "Page has been removed.",
      });
    } catch (error) {
      console.error("Failed to delete page:", error);
      toast({
        variant: "destructive",
        title: "Error Deleting Page",
        description: "Could not delete the page. Please try again.",
      });
    }
  };

  const addTile = async (pageId, tileData) => {
    try {
      const newTile = await tilesService.createTile(tileData, pageId, user.id);
      const updatedPages = pages.map((p) =>
        p.id === pageId ? { ...p, tiles: [...p.tiles, newTile] } : p
      );
      setPages(updatedPages);
      toast({
        title: "Tile Added! 🎯",
        description: "New tile has been added.",
      });
    } catch (error) {
      console.error("Failed to add tile:", error);
      toast({
        variant: "destructive",
        title: "Error Adding Tile",
        description: "Could not add the tile. Please try again.",
      });
    }
  };

  const updateTile = async (pageId, tileId, tileData) => {
    try {
      await tilesService.updateTile(tileId, tileData, pageId, user.id);
      const updatedPages = pages.map((p) => {
        if (p.id === pageId) {
          return {
            ...p,
            tiles: p.tiles.map((t) =>
              t.id === tileId ? { ...t, ...tileData } : t
            ),
          };
        }
        return p;
      });
      setPages(updatedPages);
      toast({
        title: "Tile Updated! ✨",
        description: "Tile has been updated.",
      });
    } catch (error) {
      console.error("Failed to update tile:", error);
      toast({
        variant: "destructive",
        title: "Error Updating Tile",
        description: "Could not update the tile. Please try again.",
      });
    }
  };

  const deleteTile = async (pageId, tileId) => {
    try {
      await tilesService.deleteTile(tileId, pageId, user.id);
      const updatedPages = pages.map((p) => {
        if (p.id === pageId) {
          return { ...p, tiles: p.tiles.filter((t) => t.id !== tileId) };
        }
        return p;
      });
      setPages(updatedPages);
      toast({
        title: "Tile Deleted! 🗑️",
        description: "Tile has been removed.",
      });
    } catch (error) {
      console.error("Failed to delete tile:", error);
      toast({
        variant: "destructive",
        title: "Error Deleting Tile",
        description: "Could not delete the tile. Please try again.",
      });
    }
  };

  const handlePreviewPage = (page) => navigate(`/admin/preview/${page.id}`);
  const handleBackToAdmin = () => navigate("/admin");
  const getPageById = (id) => pages.find((p) => p.id === id);

  const { pathname } = useLocation();
  const previewPageId = pathname.startsWith("/admin/preview/")
    ? pathname.split("/").pop()
    : null;
  const pageToPreview = previewPageId ? getPageById(previewPageId) : null;

  if (previewPageId && pageToPreview) {
    return (
      <Layout noHeader>
        <PagePreview page={pageToPreview} onBackToAdmin={handleBackToAdmin} />
      </Layout>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout noHeader>
      <Helmet>
        <title>Digital Drive - Admin</title>
        <meta
          name="description"
          content="Professional admin panel and viewer for product, blog, and talent pages. Built for Digital Drive."
        />
      </Helmet>
      <AdminPanel
        pages={pages}
        onPreviewPage={handlePreviewPage}
        onCreatePage={createNewPage}
        onUpdatePage={updatePage}
        onDeletePage={deletePage}
        onAddTile={addTile}
        onUpdateTile={updateTile}
        onDeleteTile={deleteTile}
      />
    </Layout>
  );
}
