// ============================================================
// ClaudeMatch — Shared UI Components
// ============================================================

// --- Segmented Control (iOS-style pill filter) ---
function SegmentedControl({ segments, activeId, onChange, style }) {
  return (
    <div style={{
      display: "flex",
      background: "var(--segmented-bg)",
      borderRadius: 8.93,
      padding: 2,
      ...style,
    }}>
      {segments.map(seg => {
        const isActive = seg.id === activeId;
        return (
          <button
            key={seg.id}
            onClick={() => onChange(seg.id)}
            style={{
              flex: 1,
              padding: "6px 0",
              textAlign: "center",
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "var(--label)" : "var(--secondary-label)",
              background: isActive ? "var(--segmented-active)" : "transparent",
              border: "none",
              borderRadius: 7,
              cursor: "pointer",
              transition: "all 0.2s ease",
              minWidth: 0,
              lineHeight: "20px",
              whiteSpace: "nowrap",
            }}
          >
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}

// --- Search Bar (iOS style) ---
function SearchBar({ value, onChange, placeholder, onFocus }) {
  return (
    <div style={{
      background: "var(--search-bg)",
      borderRadius: 10,
      padding: "8px 12px",
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}>
      <IconSearch size={16} color="var(--tertiary-label)" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder || "搜索模型..."}
        style={{
          flex: 1,
          border: "none",
          background: "transparent",
          fontSize: 16,
          color: "var(--label)",
          outline: "none",
          fontFamily: "inherit",
          lineHeight: "22px",
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            background: "var(--tertiary-fill)",
            border: "none",
            borderRadius: "50%",
            width: 18,
            height: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <IconXMark size={12} color="var(--tertiary-label)" />
        </button>
      )}
    </div>
  );
}

// --- Model Card ---
function ModelCard({ model, onPress, isFavorited, onToggleFavorite, variant, style }) {
  const isCompact = variant === "compact";
  const isList = variant === "list";

  if (isList) {
    return (
      <div
        onClick={() => onPress && onPress(model)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px",
          background: "var(--card-bg)",
          borderRadius: 14,
          cursor: "pointer",
          ...style,
        }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: model.gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <RenderIcon name={model.icon} size={22} color="#fff" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 600, color: "var(--label)" }}>
            {model.name} <span style={{ fontWeight: 400, color: "var(--secondary-label)" }}>{model.version}</span>
          </div>
          <div style={{ fontSize: 14, color: "var(--secondary-label)", marginTop: 2 }}>
            {model.tagline}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: model.color }}>
            ${model.pricing.input.toFixed(2)}<span style={{ fontSize: 11, fontWeight: 400, color: "var(--tertiary-label)" }}>/M</span>
          </div>
          <RatingStarsDisplay rating={4.5} size={12} style={{ marginTop: 2 }} />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onPress && onPress(model)}
      style={{
        background: "var(--card-bg)",
        borderRadius: 18,
        padding: isCompact ? "16px" : "20px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: "var(--card-shadow)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        ...style,
      }}
    >
      {/* Gradient accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: model.gradient, borderRadius: "18px 18px 0 0",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{
          width: isCompact ? 48 : 56, height: isCompact ? 48 : 56,
          borderRadius: isCompact ? 14 : 16,
          background: model.gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <RenderIcon name={model.icon} size={isCompact ? 26 : 30} color="#fff" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: isCompact ? 16 : 18, fontWeight: 700, color: "var(--label)" }}>
              {model.name}
            </span>
            <span style={{ fontSize: isCompact ? 13 : 14, fontWeight: 500, color: "var(--secondary-label)" }}>
              {model.version}
            </span>
          </div>
          <div style={{ fontSize: isCompact ? 12 : 13, color: "var(--secondary-label)", marginTop: 2 }}>
            {model.tagline}
          </div>
          {/* Pricing */}
          <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: isCompact ? 13 : 15, fontWeight: 700, color: model.color }}>
              ${model.pricing.input.toFixed(2)}
            </span>
            <span style={{ fontSize: 11, color: "var(--tertiary-label)" }}>
              输入 / 百万 tokens
            </span>
          </div>
        </div>
        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            onClick={e => { e.stopPropagation(); onToggleFavorite(model.id); }}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: 4, display: "flex",
            }}
          >
            <IconHeart size={20} color={isFavorited ? "#FF375F" : "var(--tertiary-label)"} filled={isFavorited} />
          </button>
        )}
      </div>

      {/* Capability bars (only on full card) */}
      {!isCompact && (
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          {["reasoning", "coding", "writing"].map(key => {
            const dim = COMPARE_DIMENSIONS.find(d => d.key === key);
            return (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 48, fontSize: 11, color: "var(--tertiary-label)", textAlign: "right" }}>
                  {dim.label}
                </span>
                <div style={{ flex: 1, height: 4, background: "var(--fill-tertiary)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{
                    width: `${model.scores[key]}%`, height: "100%",
                    background: model.gradient, borderRadius: 2,
                    transition: "width 0.5s ease",
                  }} />
                </div>
                <span style={{ width: 28, fontSize: 11, fontWeight: 600, color: "var(--secondary-label)", textAlign: "right" }}>
                  {model.scores[key]}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Best for tags */}
      <div style={{
        marginTop: isCompact ? 10 : 14,
        display: "flex", flexWrap: "wrap", gap: 6,
      }}>
        {model.bestFor.slice(0, 3).map((item, i) => (
          <span key={i} style={{
            fontSize: 11, lineHeight: "20px", padding: "0 8px",
            background: "var(--fill-secondary)", color: "var(--secondary-label)",
            borderRadius: 6,
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// --- Rating Stars ---
function RatingStarsDisplay({ rating, size, style }) {
  const s = size || 14;
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  return (
    <div style={{ display: "flex", gap: 2, ...style }}>
      {[1,2,3,4,5].map(i => {
        let filled = i <= fullStars;
        let half = !filled && hasHalf && i === fullStars + 1;
        return (
          <svg key={i} width={s} height={s} viewBox="0 0 24 24" fill="none">
            {half ? (
              <>
                <defs>
                  <linearGradient id={`halfStar${i}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="50%" stopColor="#FF9500" />
                    <stop offset="50%" stopColor="var(--tertiary-fill)" />
                  </linearGradient>
                </defs>
                <path d="M12 2l2.4 7.4h7.7l-6.2 4.5 2.4 7.4L12 17l-6.3 4.7 2.4-7.4-6.2-4.5h7.7L12 2z" fill={`url(#halfStar${i})`} />
              </>
            ) : (
              <path d="M12 2l2.4 7.4h7.7l-6.2 4.5 2.4 7.4L12 17l-6.3 4.7 2.4-7.4-6.2-4.5h7.7L12 2z" fill={filled ? "#FF9500" : "var(--tertiary-fill)"} />
            )}
          </svg>
        );
      })}
    </div>
  );
}

// --- Badge ---
function Badge({ text, color, style }) {
  return (
    <span style={{
      fontSize: 12, lineHeight: "18px", padding: "2px 8px",
      fontWeight: 500, borderRadius: 20,
      background: `${color}20`, color: color,
      ...style,
    }}>
      {text}
    </span>
  );
}

// --- Score Bar (for comparison view) ---
function CompareScoreBar({ score, maxScore, color, style }) {
  const pct = Math.round((score / maxScore) * 100);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      ...style,
    }}>
      <div style={{
        flex: 1, height: 6,
        background: "var(--fill-tertiary)",
        borderRadius: 3, overflow: "hidden",
      }}>
        <div style={{
          width: `${pct}%`, height: "100%",
          background: color,
          borderRadius: 3,
          transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }} />
      </div>
      <span style={{
        fontSize: 12, fontWeight: 600, color: "var(--secondary-label)",
        width: 32, textAlign: "right",
      }}>
        {score}
      </span>
    </div>
  );
}

// --- Pricing Row ---
function PricingRow({ model, isHighlighted, style }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "14px 16px",
      background: isHighlighted ? "var(--selected-bg)" : "transparent",
      borderRadius: 12,
      ...style,
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: model.color, flexShrink: 0,
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--label)" }}>
          {model.name} {model.version}
        </div>
      </div>
      <div style={{ textAlign: "right", display: "flex", gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--tertiary-label)" }}>输入</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--label)" }}>
            ${model.pricing.input.toFixed(2)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "var(--tertiary-label)" }}>输出</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--label)" }}>
            ${model.pricing.output.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Review Card ---
function ReviewCard({ review, style }) {
  return (
    <div style={{
      padding: "16px",
      background: "var(--card-bg)",
      borderRadius: 14,
      ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "var(--fill-secondary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 600, color: "var(--secondary-label)",
        }}>
          {review.user[0]}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--label)" }}>
            {review.user}
          </div>
          <div style={{ fontSize: 12, color: "var(--tertiary-label)" }}>
            {review.role}
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <RatingStarsDisplay rating={review.rating} size={12} />
        </div>
      </div>
      <div style={{
        marginTop: 10, fontSize: 14, lineHeight: "20px",
        color: "var(--secondary-label)",
      }}>
        {review.text}
      </div>
    </div>
  );
}

// --- Benchmark Badge ---
function BenchmarkBadge({ bench, rank, style }) {
  return (
    <div style={{
      padding: "10px 14px",
      background: "var(--fill-secondary)",
      borderRadius: 12,
      textAlign: "center",
      ...style,
    }}>
      <div style={{ fontSize: 11, fontWeight: 500, color: "var(--tertiary-label)" }}>
        {bench.name}
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, color: "var(--label)", marginTop: 2 }}>
        {bench.score}
      </div>
      <Badge text={`#${bench.rank}`} color={bench.rank === 1 ? "#AF52DE" : bench.rank === 2 ? "#FF9500" : "#34C759"} style={{ marginTop: 4, fontSize: 11 }} />
    </div>
  );
}

// --- Section Header ---
function SectionHeader({ title, action, onAction, style }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 0 8px 0",
      ...style,
    }}>
      <h2 style={{
        fontSize: 20, fontWeight: 700, color: "var(--label)",
        margin: 0, lineHeight: "24px",
      }}>
        {title}
      </h2>
      {action && (
        <button onClick={onAction} style={{
          fontSize: 14, color: "var(--accent)", background: "transparent",
          border: "none", cursor: "pointer", fontWeight: 500,
        }}>
          {action}
        </button>
      )}
    </div>
  );
}

// --- Empty State ---
function EmptyState({ icon, title, description, action, onAction, style }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "48px 24px", textAlign: "center",
      ...style,
    }}>
      {icon && (
        <div style={{ marginBottom: 16, color: "var(--tertiary-label)" }}>
          {icon}
        </div>
      )}
      <div style={{ fontSize: 17, fontWeight: 600, color: "var(--label)" }}>
        {title}
      </div>
      {description && (
        <div style={{ fontSize: 14, color: "var(--secondary-label)", marginTop: 6, maxWidth: 260 }}>
          {description}
        </div>
      )}
      {action && (
        <button onClick={onAction} style={{
          marginTop: 16, padding: "10px 20px",
          background: "var(--accent)", color: "#fff",
          border: "none", borderRadius: 20, fontSize: 15, fontWeight: 600,
          cursor: "pointer",
        }}>
          {action}
        </button>
      )}
    </div>
  );
}

// --- Toast ---
function Toast({ message, visible, onDismiss }) {
  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(onDismiss, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 100, left: "50%", transform: "translateX(-50%)",
      zIndex: 1000,
      padding: "10px 20px", background: "var(--label)", color: "var(--bg)",
      borderRadius: 20, fontSize: 14, fontWeight: 600,
      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
      animation: "toastIn 0.3s ease",
      whiteSpace: "nowrap",
    }}>
      {message}
    </div>
  );
}

// Export all components
Object.assign(window, {
  SegmentedControl, SearchBar, ModelCard, RatingStarsDisplay,
  Badge, CompareScoreBar, PricingRow, ReviewCard, BenchmarkBadge,
  SectionHeader, EmptyState, Toast,
});
