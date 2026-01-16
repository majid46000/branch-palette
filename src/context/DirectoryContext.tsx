import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDirectoryJson } from "@/data/fetchDirectory";

type Site = any;
type Category = any;
type Branch = any;

interface DirectoryData {
  branches: Branch[];
}

interface DirectoryContextValue {
  loading: boolean;
  error: unknown;
  branches: Branch[];
  getBranchById: (id: string) => Branch | undefined;
  getCategoryById: (branchId: string, categoryId: string) => Category | undefined;
  getSiteById: (branchId: string, categoryId: string, siteId: string) => Site | undefined;
  getCategoriesForBranch: (branchId: string) => Category[];
  getSitesForCategory: (branchId: string, categoryId: string) => Site[];
}

const DirectoryContext = createContext<DirectoryContextValue | undefined>(undefined);

export const DirectoryProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = useQuery<DirectoryData>({
    queryKey: ["directory"],
    queryFn: () => fetchDirectoryJson("/data/directory.json"),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,
  });

  const branches: Branch[] = data?.branches || [];

  const value = useMemo<DirectoryContextValue>(() => {
    function getBranchById(id: string) {
      return branches.find((b) => b.id === id);
    }
    function getCategoryById(branchId: string, categoryId: string) {
      const b = getBranchById(branchId);
      return b?.categories?.find((c: any) => c.id === categoryId);
    }
    function getSiteById(branchId: string, categoryId: string, siteId: string) {
      const c = getCategoryById(branchId, categoryId);
      return c?.sites?.find((s: any) => s.id === siteId);
    }
    function getCategoriesForBranch(branchId: string) {
      const b = getBranchById(branchId);
      return b?.categories || [];
    }
    function getSitesForCategory(branchId: string, categoryId: string) {
      const c = getCategoryById(branchId, categoryId);
      return c?.sites || [];
    }

    return {
      loading: isLoading,
      error,
      branches,
      getBranchById,
      getCategoryById,
      getSiteById,
      getCategoriesForBranch,
      getSitesForCategory,
    };
  }, [branches, isLoading, error]);

  return <DirectoryContext.Provider value={value}>{children}</DirectoryContext.Provider>;
};

export function useDirectory() {
  const ctx = useContext(DirectoryContext);
  if (!ctx) throw new Error("useDirectory must be used within DirectoryProvider");
  return ctx;
}