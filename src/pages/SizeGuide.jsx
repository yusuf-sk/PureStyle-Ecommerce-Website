import { useEffect } from "react";
const SizeGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 sm:p-8 p-3 md:pt-20 font-poppins pb-14">
      <div className="max-w-5xl mx-auto bg-white p-4 sm:p-8 rounded-3xl shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-4 font-montserrat">
          Size Guide & Fit Info
        </h1>

        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-2 font-montserrat">
            How to Measure
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>
              <strong>Chest:</strong> Measure around the fullest part of your
              chest.
            </li>
            <li>
              <strong>Waist:</strong> Measure around your natural waistline.
            </li>
            <li>
              <strong>Hips:</strong> Measure around the widest part of your
              hips.
            </li>
            <li>
              <strong>Length:</strong> Measure from the top of the shoulder down
              to the hem.
            </li>
          </ul>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm border border-gray-200 text-left">
            <thead className="bg-purple-100 font-montserrat">
              <tr>
                <th className="p-3 border">Size</th>
                <th className="p-3 border">Chest (in)</th>
                <th className="p-3 border">Waist (in)</th>
                <th className="p-3 border">Hips (in)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["S", "34-36", "28-30", "35-37"],
                ["M", "38-40", "32-34", "39-41"],
                ["L", "42-44", "36-38", "43-45"],
                ["XL", "46-48", "40-42", "47-49"],
                ["XXL", "50-52", "44-46", "51-53"],
              ].map(([size, chest, waist, hips]) => (
                <tr key={size} className="border-t">
                  <td className="p-3 border">{size}</td>
                  <td className="p-3 border">{chest}</td>
                  <td className="p-3 border">{waist}</td>
                  <td className="p-3 border">{hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-gray-700 text-sm">
          <p>
            All measurements are in inches. For the best fit, use a measuring
            tape and compare with our chart above. Sizes may slightly vary
            depending on the fabric and style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
