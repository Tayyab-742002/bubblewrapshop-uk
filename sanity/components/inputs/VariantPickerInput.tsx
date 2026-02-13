import { useCallback, useEffect, useState } from "react";
import { set, unset, useClient, useFormValue } from "sanity";
import type { ArrayOfPrimitivesInputProps } from "sanity";

interface VariantData {
  name: string;
  sku: string;
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  helpBox: {
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: "var(--card-bg-color, #1a1a2e)",
    border: "1px solid var(--card-border-color, #333)",
    fontSize: "13px",
    color: "var(--card-muted-fg-color, #888)",
  },
  variantCard: (isChecked: boolean) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "6px",
    border: isChecked
      ? "2px solid #22c55e"
      : "1px solid var(--card-border-color, #444)",
    backgroundColor: isChecked
      ? "rgba(34, 197, 94, 0.08)"
      : "var(--card-bg-color, transparent)",
    cursor: "pointer",
    transition: "all 0.15s ease",
  }),
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#22c55e",
  },
  variantInfo: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "2px",
    flex: 1,
  },
  variantName: {
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--card-fg-color, #fff)",
  },
  variantSku: {
    fontSize: "12px",
    color: "var(--card-muted-fg-color, #888)",
  },
  summary: {
    padding: "10px 14px",
    borderRadius: "6px",
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    fontSize: "13px",
    color: "#22c55e",
    fontWeight: 500,
  },
  errorBox: {
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    fontSize: "13px",
    color: "#ef4444",
  },
  loadingBox: {
    padding: "12px",
    borderRadius: "6px",
    fontSize: "13px",
    color: "var(--card-muted-fg-color, #888)",
  },
};

/**
 * Custom Sanity input component for selecting product variants.
 * Reads the selected product reference, fetches its variants,
 * and displays checkboxes to pick targeted variant SKUs.
 */
export function VariantPickerInput(props: ArrayOfPrimitivesInputProps) {
  const { onChange, value } = props;
  const selectedSkus: string[] = Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];

  const client = useClient({ apiVersion: "2024-01-01" });

  // Watch the product reference field on the current document
  const productRef = useFormValue(["product"]) as
    | { _ref?: string }
    | undefined;
  const productId = productRef?._ref;

  const [variants, setVariants] = useState<VariantData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch variants whenever the selected product changes
  useEffect(() => {
    if (!productId) {
      setVariants([]);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    client
      .fetch<VariantData[]>(
        `*[_id == $id || _id == "drafts." + $id][0].variants[]{
          "name": name,
          "sku": sku
        }`,
        { id: productId }
      )
      .then((result) => {
        if (!cancelled) {
          setVariants(result || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to fetch variants:", err);
          setError("Could not load variants for this product.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [productId, client]);

  const handleToggle = useCallback(
    (sku: string) => {
      const current = [...selectedSkus];
      const index = current.indexOf(sku);

      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(sku);
      }

      if (current.length === 0) {
        onChange(unset());
      } else {
        onChange(set(current));
      }
    },
    [selectedSkus, onChange]
  );

  // No product selected yet
  if (!productId) {
    return (
      <div style={styles.helpBox}>
        Select a product first to see its available variants.
      </div>
    );
  }

  // Loading
  if (loading) {
    return <div style={styles.loadingBox}>Loading variants...</div>;
  }

  // Error
  if (error) {
    return <div style={styles.errorBox}>{error}</div>;
  }

  // No variants found
  if (variants.length === 0) {
    return (
      <div style={styles.helpBox}>
        This product has no variants. The offer will apply to the base product.
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.helpBox}>
        Select which variants this offer applies to. Leave all unchecked to
        apply to <strong>ALL</strong> variants.
      </div>

      {variants.map((variant) => {
        const isChecked = selectedSkus.includes(variant.sku);
        return (
          <div
            key={variant.sku}
            style={styles.variantCard(isChecked)}
            onClick={() => handleToggle(variant.sku)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle(variant.sku);
              }
            }}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleToggle(variant.sku)}
              style={styles.checkbox}
              onClick={(e) => e.stopPropagation()}
            />
            <div style={styles.variantInfo}>
              <span style={styles.variantName}>{variant.name}</span>
              <span style={styles.variantSku}>SKU: {variant.sku}</span>
            </div>
          </div>
        );
      })}

      {selectedSkus.length > 0 && (
        <div style={styles.summary}>
          {selectedSkus.length} variant{selectedSkus.length > 1 ? "s" : ""}{" "}
          selected: {selectedSkus.join(", ")}
        </div>
      )}
    </div>
  );
}
