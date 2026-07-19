import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem().title("Configurações Globais").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("project").title("Projetos"),
      S.documentTypeListItem("playground").title("Playground"),
      S.documentTypeListItem("page").title("Páginas"),
      S.divider(),
      S.documentTypeListItem("client").title("Clientes"),
      S.documentTypeListItem("service").title("Serviços"),
      S.documentTypeListItem("technology").title("Tecnologias"),
      S.documentTypeListItem("testimonial").title("Depoimentos"),
      S.documentTypeListItem("menu").title("Menus"),
    ]);
