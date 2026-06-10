export function MissionBoard() {
  return (
    <section className="mission-board" id="overview">
      <div className="mission-copy">
        <p className="eyebrow">Research Intelligence Workbench</p>
        <h1>岗位能力图谱的证据化推理工作台</h1>
        <p>
          面向挑战杯揭榜挂帅课题，把招聘需求、课程培养、论文趋势、竞赛任务与学生能力转成可追溯关系网络，输出岗位匹配、能力缺口和演化判断。
        </p>
      </div>
      <div className="mission-docket" aria-label="评审看点">
        <span>评审看点</span>
        <strong>不是静态展示图，而是一套可解释的前端分析流程。</strong>
        <dl>
          <div>
            <dt>数据逻辑</dt>
            <dd>多源证据统一映射</dd>
          </div>
          <div>
            <dt>产品逻辑</dt>
            <dd>点击岗位驱动全局联动</dd>
          </div>
          <div>
            <dt>研究逻辑</dt>
            <dd>能力需求随时间演化</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
