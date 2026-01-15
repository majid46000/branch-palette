import { DirectoryProvider } from '@/context/DirectoryContext';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DirectoryProvider>
                <TooltipProvider>
                    {/* other children */}
                </TooltipProvider>
            </DirectoryProvider>
        </QueryClientProvider>
    );
}