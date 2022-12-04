{
  description = "Gives a fast nix shell with all the needed development packages";

  nixConfig.bash-prompt = "$ ";

  inputs = {
    nixpkgs.url = github:NixOS/nixpkgs;
    flake-utils.url = github:numtide/flake-utils;
  };

  outputs = { self, nixpkgs, flake-utils }: flake-utils.lib.eachDefaultSystem(system:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.default = pkgs.mkShell {
        name = "development-environment";
        shellHook = "cat package.json | jq '.scripts'";
        buildInputs = with pkgs; [
          nodejs
          yarn
          jq
        ];
      };
    }
  );
}
