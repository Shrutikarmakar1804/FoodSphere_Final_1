export default function Privacy() {
    return (
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked />
          Make profile private
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Allow data sharing
        </label>
      </div>
    );
  }
  