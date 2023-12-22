import { auth } from "@clerk/nextjs";
import { createUploadthing, FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
    const { userId } = auth();
    if(!userId) throw new Error("Unauthorized");
    return { userId };
}
 
// FileRouter for your app, can contain multiple FileRoutes
const ourFileRouter = {
    serverImage: f({ image: {maxFileSize: "4MB", maxFileCount: 1} })
     .middleware(() => handleAuth())
     .onUploadComplete(() => {}),
    messageFile: f(["image", "pdf"])
     .middleware(() => handleAuth())
     .onUploadComplete(() =>{})
};

// Export the constant as the default export
export default ourFileRouter;