// ============================================================
// ClaudeMatch — Main Application
// ============================================================

const { useState, useEffect, useMemo, useCallback } = React;

// ============================
// Home Screen
// ============================
function HomeScreen({ onModelPress, onComparePress, favorites, onToggleFavorite, searchQuery, setSearchQuery, activeCategory, setActiveCategory }) {
  const [isSearching, setIsSearching] = useState(false);

  const filteredModels = useMemo(() => {
    let models = getModelsByCategory(activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      models = models.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.bestFor.some(b => b.toLowerCase().includes(q)) ||
        m.description.toLowerCase().includes(q)
      );
    }
    return models;
  }, [activeCategory, searchQuery]);

  return (
    <div style={{ padding: "0 0 16px 0" }}>
      {/* Search */}
      <div style={{ padding: "0 16px" }}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onFocus={() => setIsSearching(true)}
          placeholder="搜索模型、场景、能力..."
        />
      </div>

      {/* Category filter */}
      {!isSearching && (
        <div style={{ padding: "12px 16px 0" }}>
          <SegmentedControl
            segments={CATEGORIES}
            activeId={activeCategory}
            onChange={id => { setActiveCategory(id); }}
          />
        </div>
      )}

      {/* Cancel search */}
      {isSearching && (
        <div style={{ padding: "8px 16px 0", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => { setIsSearching(false); setSearchQuery(""); }}
            style={{
              fontSize: 14, color: "var(--accent)", background: "transparent",
              border: "none", cursor: "pointer", fontWeight: 500,
            }}
          >
            取消
          </button>
        </div>
      )}

      <div style={{ padding: "0 16px" }}>
        {/* Quick compare button */}
        <button
          onClick={onComparePress}
          style={{
            width: "100%", marginTop: 14, padding: "12px 0",
            background: "var(--accent)", color: "#fff",
            border: "none", borderRadius: 14, fontSize: 16, fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 8,
          }}
        >
          <IconCompare size={20} color="#fff" />
          模型对比
        </button>

        {/* Results count */}
        <div style={{ marginTop: 16, marginBottom: 8, fontSize: 13, color: "var(--tertiary-label)" }}>
          {filteredModels.length} 个模型
        </div>

        {/* Model cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredModels.map(model => (
            <ModelCard
              key={model.id}
              model={model}
              onPress={m => onModelPress(m)}
              isFavorited={favorites.includes(model.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>

        {/* Featured collections */}
        {!searchQuery && activeCategory === "all" && (
          <div style={{ marginTop: 24 }}>
            <SectionHeader title="推荐方案" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FEATURED_COLLECTIONS.map(col => (
                <div
                  key={col.id}
                  onClick={() => {
                    onComparePress();
                  }}
                  style={{
                    padding: "16px",
                    background: "var(--card-bg)",
                    borderRadius: 14,
                    cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12,
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "var(--fill-secondary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <RenderIcon name={col.id === "enterprise" ? "building" : col.id === "startup" ? "speed" : "sparkle"} size={22} color="var(--accent)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "var(--label)" }}>
                      {col.title}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--secondary-label)", marginTop: 2 }}>
                      {col.description}
                    </div>
                  </div>
                  <IconChevronRight size={18} color="var(--tertiary-label)" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Use case quick picker */}
        {!searchQuery && activeCategory === "all" && (
          <div style={{ marginTop: 24 }}>
            <SectionHeader title="按场景查找" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {USE_CASES.map(uc => {
                const pick = getTopPickForUseCase(uc.id);
                return (
                  <button
                    key={uc.id}
                    onClick={() => onModelPress(pick)}
                    style={{
                      padding: "12px 8px",
                      background: "var(--card-bg)",
                      border: "none", borderRadius: 14,
                      cursor: "pointer", textAlign: "center",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", gap: 6,
                    }}
                  >
                    <RenderIcon name={uc.icon} size={22} color="var(--accent)" />
                    <span style={{ fontSize: 12, fontWeight: 500, color: "var(--label)" }}>
                      {uc.label}
                    </span>
                    <span style={{ fontSize: 10, color: pick.color, fontWeight: 500 }}>
                      → {pick.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom spacer for tab bar */}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

// ============================
// Compare Screen
// ============================
function CompareScreen({ compareModels, onAddModel, onRemoveModel, favorites, onToggleFavorite }) {
  const [compareMode, setCompareMode] = useState("overview"); // "overview" | "pricing" | "capabilities"
  const models = compareModels.map(id => getModelById(id)).filter(Boolean);

  return (
    <div style={{ padding: "0 16px 16px" }}>
      {/* Mode selector */}
      <SegmentedControl
        segments={[
          { id: "overview", label: "总览" },
          { id: "capabilities", label: "能力" },
          { id: "pricing", label: "价格" },
        ]}
        activeId={compareMode}
        onChange={setCompareMode}
        style={{ marginBottom: 16 }}
      />

      {/* Model headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `100px repeat(${Math.max(models.length, 2)}, 1fr)`,
        gap: 8, alignItems: "start",
      }}>
        {/* Empty corner */}
        <div />

        {/* Model icons & names */}
        {models.map(m => (
          <div key={m.id} style={{ textAlign: "center" }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: m.gradient, margin: "0 auto",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <RenderIcon name={m.icon} size={26} color="#fff" />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--label)", marginTop: 6 }}>
              {m.name}
            </div>
            <div style={{ fontSize: 11, color: "var(--secondary-label)" }}>
              {m.tagline}
            </div>
            {onRemoveModel && (
              <button
                onClick={() => onRemoveModel(m.id)}
                style={{
                  marginTop: 4, fontSize: 11, color: "var(--tertiary-label)",
                  background: "transparent", border: "none", cursor: "pointer",
                }}
              >
                移除
              </button>
            )}
          </div>
        ))}

        {/* If less than 2, show add button */}
        {models.length < 2 && (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={onAddModel}
              style={{
                width: 48, height: 48, borderRadius: 14,
                background: "var(--fill-secondary)", border: "2px dashed var(--tertiary-fill)",
                cursor: "pointer", margin: "0 auto",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <IconPlus size={24} color="var(--tertiary-label)" />
            </button>
            <div style={{ fontSize: 12, color: "var(--tertiary-label)", marginTop: 6 }}>
              添加模型
            </div>
          </div>
        )}

        {compareMode === "overview" && (
          <>
            {/* Pricing row */}
            <CompareLabel text="输入价格" />
            {models.map(m => (
              <CompareValue key={m.id} primary={`$${m.pricing.input.toFixed(2)}`} secondary="/M tokens" color={m.color} />
            ))}
            {models.length < 2 && <div />}

            <CompareLabel text="输出价格" />
            {models.map(m => (
              <CompareValue key={m.id} primary={`$${m.pricing.output.toFixed(2)}`} secondary="/M tokens" color={m.color} />
            ))}
            {models.length < 2 && <div />}

            <CompareLabel text="上下文窗口" />
            {models.map(m => (
              <CompareValue key={m.id} primary={m.contextWindow} />
            ))}
            {models.length < 2 && <div />}

            <CompareLabel text="最大输出" />
            {models.map(m => (
              <CompareValue key={m.id} primary={m.maxOutput} />
            ))}
            {models.length < 2 && <div />}

            <CompareLabel text="训练截止" />
            {models.map(m => (
              <CompareValue key={m.id} primary={m.trainingCutoff} />
            ))}
            {models.length < 2 && <div />}

            <CompareLabel text="模态支持" />
            {models.map(m => (
              <CompareValue key={m.id}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {m.modalities.map((mod, i) => (
                    <span key={i} style={{
                      fontSize: 10, padding: "2px 5px", borderRadius: 4,
                      background: "var(--fill-secondary)", color: "var(--secondary-label)",
                    }}>
                      {mod}
                    </span>
                  ))}
                </div>
              </CompareValue>
            ))}
            {models.length < 2 && <div />}
          </>
        )}

        {compareMode === "capabilities" && COMPARE_DIMENSIONS.map(dim => (
          <React.Fragment key={dim.key}>
            <CompareLabel text={dim.label} icon={dim.icon} />
            {models.map(m => (
              <CompareValue key={m.id}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: m.color }}>
                    {m.scores[dim.key]}
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <CompareScoreBar score={m.scores[dim.key]} maxScore={100} color={m.color} />
                  </div>
                </div>
              </CompareValue>
            ))}
            {models.length < 2 && <div />}
          </React.Fragment>
        ))}

        {compareMode === "pricing" && (
          <>
            <CompareLabel text="输入/百万token" />
            {models.map(m => (
              <CompareValue key={m.id} primary={`$${m.pricing.input.toFixed(2)}`} color={m.color} />
            ))}
            {models.length < 2 && <div />}

            <CompareLabel text="输出/百万token" />
            {models.map(m => (
              <CompareValue key={m.id} primary={`$${m.pricing.output.toFixed(2)}`} color={m.color} />
            ))}
            {models.length < 2 && <div />}

            <CompareLabel text="成本效率" />
            {models.map(m => (
              <CompareValue key={m.id} primary={`${m.scores.costEfficiency}/100`} color={m.color} />
            ))}
            {models.length < 2 && <div />}

            <CompareLabel text="适用场景" />
            {models.map(m => (
              <CompareValue key={m.id}>
                <div style={{ fontSize: 11, color: "var(--secondary-label)", lineHeight: "16px" }}>
                  {m.bestFor.slice(0, 3).join("、")}
                </div>
              </CompareValue>
            ))}
            {models.length < 2 && <div />}
          </>
        )}
      </div>

      {/* Add model panel */}
      <div style={{ marginTop: 20 }}>
        <SectionHeader title="添加对比模型" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {MODELS.filter(m => !compareModels.includes(m.id)).map(m => (
            <div
              key={m.id}
              onClick={() => onAddModel && onAddModel(m.id)}
              style={{
                padding: "12px 16px", background: "var(--card-bg)",
                borderRadius: 12, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: m.gradient,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <RenderIcon name={m.icon} size={16} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--label)" }}>
                  {m.name} {m.version}
                </span>
              </div>
              <IconPlus size={18} color="var(--accent)" />
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

function CompareLabel({ text, icon }) {
  return (
    <div style={{
      padding: "10px 0",
      display: "flex", alignItems: "center", gap: 6,
      fontSize: 13, fontWeight: 500, color: "var(--secondary-label)",
    }}>
      {icon && <RenderIcon name={icon} size={14} color="var(--tertiary-label)" />}
      {text}
    </div>
  );
}

function CompareValue({ primary, secondary, color, children, style }) {
  return (
    <div style={{
      padding: "10px 0", textAlign: "center",
      ...style,
    }}>
      {children || (
        <>
          <div style={{ fontSize: 15, fontWeight: 700, color: color || "var(--label)" }}>
            {primary}
          </div>
          {secondary && (
            <div style={{ fontSize: 11, color: "var(--tertiary-label)", marginTop: 1 }}>
              {secondary}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ============================
// Detail Screen
// ============================
function DetailScreen({ model, onBack, isFavorited, onToggleFavorite }) {
  const [activeSection, setActiveSection] = useState("overview");

  if (!model) return null;

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Hero */}
      <div style={{
        padding: "0 16px 24px",
        position: "relative",
      }}>
        {/* Back button */}
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "var(--fill-secondary)", border: "none",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}>
          <IconChevronLeft size={20} color="var(--label)" />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: model.gradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <RenderIcon name={model.icon} size={38} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <h1 style={{
                fontSize: 28, fontWeight: 800, color: "var(--label)",
                margin: 0, lineHeight: "32px",
              }}>
                {model.name}
              </h1>
              <span style={{ fontSize: 17, fontWeight: 500, color: "var(--secondary-label)" }}>
                {model.version}
              </span>
            </div>
            <div style={{ fontSize: 15, color: "var(--secondary-label)", marginTop: 4 }}>
              {model.tagline}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--tertiary-label)" }}>输入</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: model.color }}>
                  ${model.pricing.input.toFixed(2)}
                  <span style={{ fontSize: 12, fontWeight: 400, color: "var(--tertiary-label)" }}>/M</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--tertiary-label)" }}>输出</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: model.color }}>
                  ${model.pricing.output.toFixed(2)}
                  <span style={{ fontSize: 12, fontWeight: 400, color: "var(--tertiary-label)" }}>/M</span>
                </div>
              </div>
            </div>
          </div>
          {/* Favorite */}
          <button
            onClick={() => onToggleFavorite(model.id)}
            style={{
              background: isFavorited ? `${model.color}18` : "var(--fill-secondary)",
              border: "none", borderRadius: "50%",
              width: 44, height: 44, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <IconHeart size={22} color={isFavorited ? model.color : "var(--tertiary-label)"} filled={isFavorited} />
          </button>
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ padding: "0 16px" }}>
        <SegmentedControl
          segments={[
            { id: "overview", label: "概览" },
            { id: "benchmarks", label: "基准" },
            { id: "reviews", label: "评价" },
          ]}
          activeId={activeSection}
          onChange={setActiveSection}
        />
      </div>

      {/* Section content */}
      <div style={{ padding: "16px 16px 0" }}>
        {activeSection === "overview" && (
          <>
            {/* Description */}
            <div style={{
              padding: "16px", background: "var(--card-bg)",
              borderRadius: 14, fontSize: 15, lineHeight: "22px",
              color: "var(--secondary-label)",
            }}>
              {model.description}
            </div>

            {/* Capabilities */}
            <SectionHeader title="能力评分" style={{ marginTop: 20 }} />
            <div style={{
              padding: "16px", background: "var(--card-bg)", borderRadius: 14,
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              {COMPARE_DIMENSIONS.map(dim => (
                <div key={dim.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <RenderIcon name={dim.icon} size={16} color="var(--tertiary-label)" />
                  <span style={{ width: 56, fontSize: 14, color: "var(--secondary-label)" }}>
                    {dim.label}
                  </span>
                  <CompareScoreBar score={model.scores[dim.key]} maxScore={100} color={model.color} style={{ flex: 1 }} />
                </div>
              ))}
            </div>

            {/* Best for */}
            <SectionHeader title="最佳场景" style={{ marginTop: 20 }} />
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 8,
            }}>
              {model.bestFor.map((item, i) => (
                <span key={i} style={{
                  padding: "8px 14px", fontSize: 14, fontWeight: 500,
                  background: "var(--card-bg)", color: "var(--label)",
                  borderRadius: 10,
                }}>
                  {item}
                </span>
              ))}
            </div>

            {/* Specs */}
            <SectionHeader title="技术规格" style={{ marginTop: 20 }} />
            <div style={{
              padding: "8px 16px", background: "var(--card-bg)", borderRadius: 14,
            }}>
              {[
                { label: "上下文窗口", value: model.contextWindow },
                { label: "最大输出", value: model.maxOutput },
                { label: "训练数据截止", value: model.trainingCutoff },
                { label: "支持模态", value: model.modalities.join("、") },
              ].map((spec, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: i < 3 ? "0.5px solid var(--separator)" : "none",
                }}>
                  <span style={{ fontSize: 15, color: "var(--secondary-label)" }}>{spec.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "var(--label)" }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeSection === "benchmarks" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {model.benchmarks.map((bench, i) => (
              <BenchmarkBadge key={i} bench={bench} rank={bench.rank} />
            ))}
            {/* Score summary */}
            <div style={{ gridColumn: "1 / -1", padding: "16px", background: "var(--card-bg)", borderRadius: 14, textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "var(--tertiary-label)" }}>
                综合排名
              </div>
              <div style={{ fontSize: 40, fontWeight: 800, color: model.color, marginTop: 4 }}>
                #{model.benchmarks[0].rank}
              </div>
              <div style={{ fontSize: 14, color: "var(--secondary-label)", marginTop: 4 }}>
                在 {MODELS.length} 个模型中
              </div>
            </div>
          </div>
        )}

        {activeSection === "reviews" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Average rating */}
            <div style={{
              padding: "16px", background: "var(--card-bg)", borderRadius: 14,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: "var(--label)" }}>
                {model.reviews.reduce((s, r) => s + r.rating, 0) / model.reviews.length}
              </div>
              <div>
                <RatingStarsDisplay rating={model.reviews.reduce((s, r) => s + r.rating, 0) / model.reviews.length} size={16} />
                <div style={{ fontSize: 13, color: "var(--tertiary-label)", marginTop: 2 }}>
                  {model.reviews.length} 条评价
                </div>
              </div>
            </div>
            {model.reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================
// Favorites Screen
// ============================
function FavoritesScreen({ favorites, onModelPress, onToggleFavorite }) {
  const favModels = favorites.map(id => getModelById(id)).filter(Boolean);

  return (
    <div style={{ padding: "0 16px 16px" }}>
      {favModels.length === 0 ? (
        <EmptyState
          icon={<IconHeart size={48} color="var(--tertiary-fill)" filled={false} />}
          title="还没有收藏"
          description="在模型详情页点击爱心图标，收藏你感兴趣的模型"
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 13, color: "var(--tertiary-label)", marginBottom: 4 }}>
            {favModels.length} 个收藏
          </div>
          {favModels.map(model => (
            <ModelCard
              key={model.id}
              model={model}
              onPress={m => onModelPress(m)}
              isFavorited={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
      <div style={{ height: 20 }} />
    </div>
  );
}

// ============================
// Settings Screen
// ============================
function SettingsScreen({ theme, onToggleTheme }) {
  return (
    <div style={{ padding: "0 16px 16px" }}>
      {/* Theme */}
      <div style={{ marginTop: 8 }}>
        <div style={{
          padding: "14px 16px", background: "var(--card-bg)", borderRadius: 14,
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {theme === "dark" ? (
                <IconMoon size={22} color="var(--label)" />
              ) : (
                <IconSun size={22} color="var(--label)" />
              )}
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "var(--label)" }}>
                  深色模式
                </div>
                <div style={{ fontSize: 13, color: "var(--secondary-label)", marginTop: 2 }}>
                  {theme === "dark" ? "已开启" : "已关闭"}
                </div>
              </div>
            </div>
            <button
              onClick={onToggleTheme}
              style={{
                width: 52, height: 32, borderRadius: 16,
                background: theme === "dark" ? "var(--accent)" : "var(--tertiary-fill)",
                border: "none", cursor: "pointer", position: "relative",
                transition: "background 0.3s ease",
              }}
            >
              <div style={{
                width: 28, height: 28,
                background: "#fff", borderRadius: "50%",
                position: "absolute", top: 2,
                left: theme === "dark" ? 22 : 2,
                transition: "left 0.3s ease",
                boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* About */}
      <div style={{ marginTop: 24 }}>
        <div style={{
          padding: "14px 16px", background: "var(--card-bg)", borderRadius: 14,
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          <SettingsRow label="版本" value="1.0.0" />
          <SettingsRow label="设计风格" value="iOS Native" />
          <SettingsRow label="数据更新" value="2026年6月" />
        </div>
      </div>

      {/* Info */}
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "var(--tertiary-label)" }}>
          ClaudeMatch
        </div>
        <div style={{ fontSize: 12, color: "var(--tertiary-label)", marginTop: 4 }}>
          AI 模型匹配与对比平台
        </div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

function SettingsRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 15, color: "var(--label)" }}>{label}</span>
      <span style={{ fontSize: 15, color: "var(--secondary-label)" }}>{value}</span>
    </div>
  );
}

// ============================
// Tab Bar
// ============================
function TabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: "browse", label: "浏览", icon: "browse" },
    { id: "compare", label: "对比", icon: "compare" },
    { id: "favorites", label: "收藏", icon: "star" },
    { id: "settings", label: "设置", icon: "settings" },
  ];

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "var(--tab-bar-bg)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderTop: "0.5px solid var(--separator)",
      paddingBottom: "env(safe-area-inset-bottom, 8px)",
      display: "flex", zIndex: 100,
    }}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const iconMap = {
          browse: IconBrowse,
          compare: IconCompare,
          star: IconStar,
          settings: IconSettings,
        };
        const IconComp = iconMap[tab.icon];
        const color = isActive ? "var(--accent)" : "var(--tertiary-label)";

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1, paddingTop: 8, paddingBottom: 6,
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 3,
              background: "transparent", border: "none", cursor: "pointer",
            }}
          >
            <IconComp size={24} color={color} filled={isActive && tab.id === "star"} />
            <span style={{
              fontSize: 10, fontWeight: isActive ? 600 : 400,
              color: color,
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ============================
// Navigation Bar
// ============================
function NavigationBar({ title, largeTitle, rightAction, onRightAction, showBack, onBack }) {
  return (
    <div style={{
      paddingTop: "env(safe-area-inset-top, 0px)",
      background: "var(--nav-bg)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      {/* Standard title bar */}
      <div style={{
        height: 44, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 16px",
      }}>
        <div style={{ width: 60 }}>
          {showBack && (
            <button onClick={onBack} style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: 0, display: "flex", alignItems: "center", gap: 2,
            }}>
              <IconChevronLeft size={20} color="var(--accent)" />
              <span style={{ fontSize: 17, color: "var(--accent)" }}>返回</span>
            </button>
          )}
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: "var(--label)" }}>
          {!largeTitle ? title : ""}
        </div>
        <div style={{ width: 60, textAlign: "right" }}>
          {rightAction && (
            <button onClick={onRightAction} style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontSize: 15, color: "var(--accent)", fontWeight: 500,
            }}>
              {rightAction}
            </button>
          )}
        </div>
      </div>

      {/* Large title */}
      {largeTitle && (
        <div style={{
          padding: "0 16px 12px",
        }}>
          <h1 style={{
            fontSize: 34, fontWeight: 800, color: "var(--label)",
            margin: 0, lineHeight: "40px", letterSpacing: "-0.01em",
          }}>
            {title}
          </h1>
        </div>
      )}
    </div>
  );
}

// ============================
// Root App
// ============================
function App() {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [compareModels, setCompareModels] = useState(["opus", "sonnet"]);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cm_favorites")) || []; }
    catch { return []; }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("cm_theme") || "light"; }
    catch { return "light"; }
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Persist theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cm_theme", theme);
  }, [theme]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("cm_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = useCallback((modelId) => {
    setFavorites(prev => {
      const next = prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId];
      const added = !prev.includes(modelId);
      setToastMessage(added ? "已添加到收藏" : "已取消收藏");
      setToastVisible(true);
      return next;
    });
  }, []);

  const handleModelPress = useCallback((model) => {
    setSelectedModelId(model.id);
  }, []);

  const handleAddCompareModel = useCallback((modelId) => {
    if (!modelId) {
      // Show a way to pick
      setActiveTab("browse");
      return;
    }
    if (compareModels.length >= 4) {
      setToastMessage("最多对比 4 个模型");
      setToastVisible(true);
      return;
    }
    if (!compareModels.includes(modelId)) {
      setCompareModels(prev => [...prev, modelId]);
    }
  }, [compareModels]);

  const handleRemoveCompareModel = useCallback((modelId) => {
    setCompareModels(prev => prev.filter(id => id !== modelId));
  }, []);

  const selectedModel = selectedModelId ? getModelById(selectedModelId) : null;

  // Determine current screen
  const isDetail = selectedModelId !== null;

  const tabTitles = {
    browse: "ClaudeMatch",
    compare: "模型对比",
    favorites: "我的收藏",
    settings: "设置",
  };

  return (
    <div id="app" style={{
      width: "100%", height: "100%",
      background: "var(--bg)",
      display: "flex", flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Navigation Bar */}
      {isDetail ? (
        <NavigationBar
          title={selectedModel ? `${selectedModel.name} ${selectedModel.version}` : ""}
          showBack
          onBack={() => setSelectedModelId(null)}
          rightAction={selectedModel ? (favorites.includes(selectedModel.id) ? "♥" : "♡") : null}
          onRightAction={selectedModel ? () => handleToggleFavorite(selectedModel.id) : null}
        />
      ) : (
        <NavigationBar
          title={tabTitles[activeTab]}
          largeTitle={activeTab === "browse"}
        />
      )}

      {/* Content */}
      <div style={{
        flex: 1, overflow: "auto",
        WebkitOverflowScrolling: "touch",
        paddingBottom: activeTab && !isDetail ? 100 : 0,
      }}>
        {isDetail && selectedModel ? (
          <DetailScreen
            model={selectedModel}
            onBack={() => setSelectedModelId(null)}
            isFavorited={favorites.includes(selectedModel.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : activeTab === "browse" ? (
          <HomeScreen
            onModelPress={handleModelPress}
            onComparePress={() => setActiveTab("compare")}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        ) : activeTab === "compare" ? (
          <CompareScreen
            compareModels={compareModels}
            onAddModel={handleAddCompareModel}
            onRemoveModel={handleRemoveCompareModel}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : activeTab === "favorites" ? (
          <FavoritesScreen
            favorites={favorites}
            onModelPress={handleModelPress}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : activeTab === "settings" ? (
          <SettingsScreen
            theme={theme}
            onToggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")}
          />
        ) : null}
      </div>

      {/* Tab Bar (hide on detail) */}
      {!isDetail && (
        <TabBar activeTab={activeTab} onTabChange={(tab) => {
          setActiveTab(tab);
          setSearchQuery("");
          setActiveCategory("all");
        }} />
      )}

      {/* Toast */}
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </div>
  );
}

// Mount
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
