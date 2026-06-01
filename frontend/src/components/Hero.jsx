function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-cyan-600 text-white">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-300 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold">
          MediIntel AI
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-blue-100">
          Healthcare Intelligence Platform
        </h2>

        {/* Description */}
        <p className="mt-8 text-lg md:text-xl max-w-3xl mx-auto text-blue-50 leading-relaxed">
          AI-powered prescription analysis and healthcare intelligence
          using OCR, NLP, machine learning, and clinical analytics.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <h3 className="text-5xl font-bold">
              98.5%
            </h3>

            <p className="mt-3 text-blue-100">
              Heart Disease Prediction Accuracy
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <h3 className="text-5xl font-bold">
              OCR + NLP
            </h3>

            <p className="mt-3 text-blue-100">
              Automated Prescription Understanding
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <h3 className="text-5xl font-bold">
              AI Insights
            </h3>

            <p className="mt-3 text-blue-100">
              Clinical Risk Assessment & Analytics
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;