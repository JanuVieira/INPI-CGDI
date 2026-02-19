  // Configuracao minima do Tailwind com mapeamento para tokens de marca
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brand: {
            line: "var(--dt-border-secondary)",
            border: "var(--dt-border-primary)",
            text: "var(--dt-content-primary)",
            secondary: "var(--dt-content-secondary)",
            muted: "var(--dt-content-tertiary)",
            link: "var(--dt-content-brand)",
            cgdi: "var(--dt-accent-orange)",
            bg: "var(--dt-background-primary)",
            surface: "var(--dt-background-secondary)",
            backdrop: "var(--dt-color-alpha-dark-8)"
          }
        }
      }
    }
  };
