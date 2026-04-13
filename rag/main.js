import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"


const loader = new PDFLoader("./story (1).pdf")


const docs = await loader.load()

console.log(docs);

