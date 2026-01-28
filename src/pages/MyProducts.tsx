import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Settings, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  date: string;
  daysLeft?: number;
  image: string;
}

export const MyProducts = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Majonez Dekoracyjny Winiary",
      date: "Pon, 28.08.2025",
      daysLeft: 5,
      image: "/placeholder.svg"
    },
    {
      id: "2", 
      name: "Heinz ketchup łagodny pomidorowy duży 500g",
      date: "Pon, 28.08.2025",
      image: "/placeholder.svg"
    },
    {
      id: "3",
      name: "Schwarzwalder Schinken Oryginalna Szynka Schwarzwaldzka",
      date: "Pon, 28.08.2025",
      image: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Schwarzwalder Schinken Oryginalna Szynka Schwarzwaldzka",
      date: "Pon, 28.08.2025",
      image: "/placeholder.svg"
    }
  ]);
  
  const navigate = useNavigate();

  const handleScan = () => {
    navigate("/scan");
  };

  const handleAddManually = () => {
    navigate("/add-manually");
  };

  const handleSettings = () => {
    navigate("/settings");
    // Handle settings
  };

  const handleRemoveProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleProductClick = (product: Product) => {
    navigate("/product-details", { state: { product } });
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col pb-24">
        <div className="px-6 py-8">
          <div className="space-y-2">
            <h1 className="text-lg font-extrabold tracking-wide text-foreground">My products</h1>
            <p className="text-foreground text-sm font-normal opacity-90">
              Nothing here yet!<br /><br />
              <span className="text-primary font-semibold">Scan</span> a barcode when you open food<br />
              to avoid waste.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center -mt-32">
          <svg xmlns="http://www.w3.org/2000/svg" width="281" height="280" viewBox="0 0 281 280" fill="none" className="w-32 h-32">
            <path d="M0.5 23.0769C0.5 10.3319 10.8319 0 23.5769 0H257.423C270.168 0 280.5 10.3319 280.5 23.0769V256.923C280.5 269.668 270.168 280 257.423 280H23.5769C10.8319 280 0.5 269.668 0.5 256.923V23.0769Z" fill="#EBEBEB"/>
            <path d="M98.9615 81.5382C98.9615 78.9892 101.028 76.9229 103.577 76.9229H177.423C179.972 76.9229 182.038 78.9892 182.038 81.5382V196.923C182.038 199.472 179.972 201.538 177.423 201.538H103.577C101.028 201.538 98.9615 199.472 98.9615 196.923V81.5382Z" fill="white"/>
            <path d="M166.725 133.678C169.274 133.678 171.34 135.744 171.34 138.293V186.341C171.34 188.89 169.274 190.956 166.725 190.956H114.585C112.036 190.956 109.97 188.89 109.97 186.341V138.293C109.97 135.744 112.036 133.678 114.585 133.678H166.725ZM166.725 86.2168C169.274 86.2168 171.34 88.2831 171.34 90.832V122.515C171.34 125.064 169.274 127.131 166.725 127.131H114.585C112.036 127.131 109.97 125.064 109.97 122.515V90.832C109.97 88.2831 112.036 86.2169 114.585 86.2168H166.725Z" fill="#EBEBEB"/>
            <path d="M128.192 144.615V147.692H115.885V144.615H128.192Z" fill="white"/>
            <path d="M128.192 112.308V115.385H115.885V112.308H128.192Z" fill="white"/>
            <path d="M22.9 249.428L249.928 22.3993L256.528 28.999L29.4997 256.027L22.9 249.428Z" fill="white"/>
          </svg>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="bg-gradient-primary px-3 py-2 flex items-center justify-between">
            <div className="flex-1 flex justify-center mr-12">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleAddManually}
                className="text-white flex flex-col items-center space-y-1 h-auto px-4 py-2 min-w-[80px] [&_svg]:!size-[23px] hover:bg-transparent hover:text-white active:bg-transparent active:text-white"
              >
                <Plus size={23} />
                <span className="text-xs">Add manually</span>
              </Button>
            </div>

            <div className="flex-1 flex justify-center ml-12">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleSettings}
                className="text-white flex flex-col items-center space-y-1 h-auto px-4 py-2 min-w-[80px] [&_svg]:!size-[23px] hover:bg-transparent hover:text-white active:bg-transparent active:text-white"
              >
                <Settings size={23} />
                <span className="text-xs">Settings</span>
              </Button>
            </div>
          </div>

          <div className="absolute left-1/2 bottom-[30%] -translate-x-1/2 w-24 h-24 rounded-full p-[5px] bg-gradient-primary">
            <Button
              onClick={handleScan}
              className="w-full h-full bg-white text-primary rounded-full flex flex-col items-center justify-center [&_svg]:!w-10 [&_svg]:!h-6 hover:bg-white hover:text-primary active:bg-white active:text-primary"
            >
              <svg width="40" height="24" viewBox="0 0 88 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mb-[-2px] mt-1">
                <path d="M45.9762 52.022V0.912598H50.0856V52.022H45.9762ZM58.3043 52.022V0.912598H62.4137V52.022H58.3043ZM78.8513 52.022V0.912598H87.0701V52.022H78.8513Z" fill="url(#paint0_linear_scan1)"/>
                <path d="M0.762146 52.022V0.912598H4.87154V52.022H0.762146ZM13.0903 52.022V0.912598H17.1997V52.022H13.0903ZM33.6373 52.022V0.912598H41.8561V52.022H33.6373Z" fill="url(#paint1_linear_scan1)"/>
                <defs>
                  <linearGradient id="paint0_linear_scan1" x1="66.5231" y1="0.912598" x2="66.5231" y2="52.022" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF9900"/>
                    <stop offset="1" stopColor="#FF00BB"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_scan1" x1="21.3091" y1="0.912598" x2="21.3091" y2="52.022" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF9900"/>
                    <stop offset="1" stopColor="#FF00BB"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-semibold mt-[-2px]">SCAN</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="flex-1 px-6 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-lg font-extrabold tracking-wide text-foreground">My products</h1>
            <p className="text-foreground text-sm font-normal opacity-90">
              <span className="text-primary font-semibold">Scan</span> a barcode to add another product
            </p>
          </div>

          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="flex items-center space-x-4 py-4 border-b border-border cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="text-foreground text-sm font-normal opacity-90">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-foreground text-sm font-extrabold opacity-90">{product.date}</span>
                    {product.daysLeft && (
                      <span className="text-primary text-sm font-extrabold">
                        {product.daysLeft} days left
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveProduct(product.id);
                  }}
                  className="text-primary"
                >
                  <X size={20} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-gradient-primary px-3 py-2 flex items-center justify-between">
          <div className="flex-1 flex justify-center mr-12">
            <Button
              variant="ghost"
              size="lg"
              onClick={handleAddManually}
              className="text-white flex flex-col items-center space-y-1 h-auto px-4 py-2 min-w-[80px] [&_svg]:!size-[23px] hover:bg-transparent hover:text-white active:bg-transparent active:text-white"
            >
              <Plus size={23} />
              <span className="text-xs">Add manually</span>
            </Button>
          </div>

          <div className="flex-1 flex justify-center ml-12">
            <Button
              variant="ghost"
              size="lg"
              onClick={handleSettings}
              className="text-white flex flex-col items-center space-y-1 h-auto px-4 py-2 min-w-[80px] [&_svg]:!size-[23px] hover:bg-transparent hover:text-white active:bg-transparent active:text-white"
            >
              <Settings size={23} />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>

        <div className="absolute left-1/2 bottom-[30%] -translate-x-1/2 w-24 h-24 rounded-full p-[5px] bg-gradient-primary">
          <Button
            onClick={handleScan}
            className="w-full h-full bg-white text-primary rounded-full flex flex-col items-center justify-center [&_svg]:!w-10 [&_svg]:!h-6 hover:bg-white hover:text-primary active:bg-white active:text-primary"
          >
            <svg width="40" height="24" viewBox="0 0 88 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mb-[-2px] mt-1">
              <path d="M45.9762 52.022V0.912598H50.0856V52.022H45.9762ZM58.3043 52.022V0.912598H62.4137V52.022H58.3043ZM78.8513 52.022V0.912598H87.0701V52.022H78.8513Z" fill="url(#paint0_linear_scan2)"/>
              <path d="M0.762146 52.022V0.912598H4.87154V52.022H0.762146ZM13.0903 52.022V0.912598H17.1997V52.022H13.0903ZM33.6373 52.022V0.912598H41.8561V52.022H33.6373Z" fill="url(#paint1_linear_scan2)"/>
              <defs>
                <linearGradient id="paint0_linear_scan2" x1="66.5231" y1="0.912598" x2="66.5231" y2="52.022" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9900"/>
                  <stop offset="1" stopColor="#FF00BB"/>
                </linearGradient>
                <linearGradient id="paint1_linear_scan2" x1="21.3091" y1="0.912598" x2="21.3091" y2="52.022" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9900"/>
                  <stop offset="1" stopColor="#FF00BB"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-semibold mt-[-2px]">SCAN</span>
          </Button>
        </div>
      </div>
    </div>
  );
};